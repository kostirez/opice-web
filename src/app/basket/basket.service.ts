import { Injectable, OnDestroy } from '@angular/core';
import { ProductSummary } from "../product/product.component";
import { Observable, Subject, Subscription } from "rxjs";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { StrapiApiService } from "../strapi-api.service";
import { GoogleAnalyticsService } from "ngx-google-analytics";
import { LocalService } from "../local.service";

export interface Order {
    invoice_id: number;
    products: ProductSummary[];
    transportCode: string;
    transportPlace: {};
    paymentCode: string;
    gdpr: boolean;
    obchodniPodminky: boolean;
    address: {
      street: string;
      city: string;
      postCode: string;
    },
    person: {
      name: string;
      email: string;
      tel: number;
    }
    note: string;
}

export interface OrderResponse {
  id: number;
  transportCode: string;
  paymentCode: string;
  totalPrice: number;
  invoiceId: number;
}

const BASKET_URLS = ['prehled', 'doprava-a-platba', 'souhrn'];

@Injectable({
  providedIn: 'root'
})
export class BasketService implements OnDestroy{

  private products: ProductSummary[] = [];

  private stateSubject: Subject<number> = new Subject<number>();
  state$: Observable<number> = this.stateSubject.asObservable();
  orderResponse: OrderResponse | null;
  state = 0;
  payTransForm:  FormGroup;
  infoForm:  FormGroup;
  termForm:  FormGroup;
  transportPrice: 0;
  paymentPrice: 0;


  private productsSubject: Subject<ProductSummary[]> = new Subject<ProductSummary[]>();
  public productsObs: Observable<ProductSummary[]> = this.productsSubject.asObservable();

  private subs: Subscription[] = [];
  constructor(
    private router: Router,
    private strapiApiService: StrapiApiService,
    private $gaService: GoogleAnalyticsService,
    private localService: LocalService,
  ) {
    this.products = localService.getData('products') || [];
    this.productsSubject.next([]);
    this.subs.push(this.state$.subscribe(s => this.state = s));
    this.subs.push(this.productsObs.subscribe(p => {
      this.products = p;
      this.localService.saveData('products', this.products);
    }));
  }

  addProduct(product: ProductSummary) {
    this.$gaService.event('add_to_cart', 'basket', 'product added');
    const index = this.products.findIndex(p => p.name==product.name && p.color == product.color && p.size == product.size);
    if (index < 0) {
      this.products.push(product);
    } else {
      this.products[index].count += 1;
    }
    this.productsSubject.next(this.products)
  }

  getAllProdct(): ProductSummary[] {
    return this.products;
  }

  getPrice(): number {
    return this.products.reduce((sum, current) => sum + current.priceForOne * current.count, 0);
  }


  removeOneProdctSummary(product: ProductSummary) {
    this.$gaService.event('remove_from_cart', 'basket', 'product removed');
    const index = this.products.findIndex(p => p.name==product.name && p.color == product.color && p.size == product.size);
    this.products.splice(index, 1);
    this.productsSubject.next(this.products);
  }

  setPayTransForm(form: FormGroup): FormGroup{
    if (!this.payTransForm) {
      this.payTransForm = form;
    }
    return this.payTransForm;
  }

  setInfoForm(form: FormGroup) {
    if (!this.infoForm) {
      this.infoForm = form;
    }
    return this.infoForm;
  }

  setTermForm(form: FormGroup) {
    this.termForm = form;
  }

  moveForward(): Promise<number> {
    if(this.state !== 1) {
      this.setState(this.state + 1);
      return;
    }
    if (this.state === 1) {
      if (this.payTransForm.get('paymentCode').value==='HOT' &&
        this.payTransForm.get('transportCode').value!=='OSOB') {
        this.payTransForm.controls['paymentCode'].setErrors({'match': true});
      } else {
        this.payTransForm.controls['paymentCode'].setErrors({'match': null});
        this.payTransForm.controls['paymentCode'].updateValueAndValidity();
        this.payTransForm.controls['transportPlaceArray'].updateValueAndValidity();
      }
      if(this.payTransForm.valid) {
        this.setState(2);
      } else {
        this.payTransForm.markAllAsTouched();
      }
    }
  }

  moveBack(): void {
    if (this.state==0) {
      this.router.navigate(['../eshop']);
      return;
    }
    this.setState(this.state-1);
  }

  setState(state: number): void {
    this.stateSubject.next(state)

  }

  initState(): void {
    this.setState(0)
  }


  order(): Observable<{orderResponse: OrderResponse, image: string}> | null {
    let error = false;

    if(!this.payTransForm || !this.payTransForm.valid){
      this.setState(1);
      error = true;
    }

    if(!this.termForm.valid) {
      this.termForm.markAllAsTouched();
      error = true;
    }

    if(!this.infoForm.valid) {
      this.infoForm.markAllAsTouched();
      error = true;
    }

    if (error) {
      return null;
    }
    console.log('order', this.payTransForm.value.transportPlaceArray);
    const order: Order = {
      invoice_id: 0,
      products: this.products,
      transportCode: this.payTransForm.value.transportCode,
      transportPlace: this.payTransForm.value.transportPlaceArray[0] ?? {},
      paymentCode: this.payTransForm.value.paymentCode,
      gdpr: !!this.termForm.value.gdpr,
      obchodniPodminky: !!this.termForm.value.term,
      address: {
        street: this.infoForm.value.street,
        city: this.infoForm.value.city,
        postCode: this.infoForm.value.postCode,
      },
      person: {
        name: this.infoForm.value.name,
        email: this.infoForm.value.email,
        tel: this.infoForm.value.tel,
      },
      note: this.infoForm.value.note,
    }
    return this.strapiApiService.sendOrder(order)
  }

  deleteBasket() {
    this.productsSubject.next([])
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  calculateProductCount(summary: ProductSummary[]): number {
    return summary.reduce((sum, current) => sum + current.count, 0);
  }
}
