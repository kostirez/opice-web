import { Injectable } from '@angular/core';
import { ProductSummary } from "../product/product.component";
import { Observable, Subject } from "rxjs";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { StrapiApiService } from "../strapi-api.service";

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
}

const BASKET_URLS = ['prehled', 'doprava-a-platba', 'souhrn'];

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private products: ProductSummary[] = [
    {
      name: 'string',
      color: 'string',
      size: 'string',
      count: 2,
      priceForOne: 23,
    }
  ];

  private stateSubject: Subject<number> = new Subject<number>();
  state$: Observable<number> = this.stateSubject.asObservable();
  orderResponse: Order | null;
  state = 0;
  payTransForm:  FormGroup;
  infoForm:  FormGroup;
  termForm:  FormGroup;
  transportPrice: 0;
  paymentPrice: 0;


  private productsSubject: Subject<ProductSummary[]> = new Subject<ProductSummary[]>();
  public productsObs: Observable<ProductSummary[]> = this.productsSubject.asObservable();
  constructor(
    private router: Router,
    private strapiApiService: StrapiApiService,
  ) {
    this.productsSubject.next([]);
    this.state$.subscribe(s => this.state = s);
  }

  addProduct(product: ProductSummary) {
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
    const index = this.products.findIndex(p => p.name==product.name && p.color == product.color && p.size == product.size);
    this.products.splice(index, 1);
    this.productsSubject.next(this.products);
  }

  setPayTransForm(form: FormGroup) {
    this.payTransForm = form;
  }

  setInfoForm(form: FormGroup) {
    this.infoForm = form;
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
      if(this.payTransForm.valid) {
        console.log('valid', this.payTransForm.valid)
        this.setState(2);
        return;
      } else {
        this.payTransForm.markAllAsTouched()
        return;
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
    if (state<3){
      this.router.navigate(['kosik', BASKET_URLS[state]])
        .then(() => this.stateSubject.next(state));
    } else {
      this.stateSubject.next(state)
    }

  }

  initState(): void {
    const lastPath = this.router.url.split('/').pop();
    if (lastPath==='kosik') {
      this.setState(0)
    } else {
      this.setState(BASKET_URLS.findIndex(u=> u=== lastPath));
    }
  }


  order(): Observable<{data: {attributes: Order}}> | null {
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
    const order: Order = {
      invoice_id: 0,
      products: this.products,
      transportCode: this.payTransForm.value.transportCode,
      transportPlace: this.payTransForm.value.transportPlace ?? {},
      paymentCode: this.payTransForm.value.paymentCode,
      gdpr: true,
      obchodniPodminky: true,
      address: {
        street: this.infoForm.value.street,
        city: this.infoForm.value.city,
        postCode: this.infoForm.value.postCode,
      },
      person: {
        name: this.infoForm.value.name,
        email: this.infoForm.value.email,
        tel: 0,
      }
    }
    return this.strapiApiService.sendOrder(order)
  }

  deleteBasket() {
    this.productsSubject.next([])
  }
}
