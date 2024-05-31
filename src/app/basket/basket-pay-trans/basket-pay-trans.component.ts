import { Component, HostListener, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { BasketService } from "../basket.service";
import { map, Observable } from "rxjs";
import { SingleTypesService } from "../../apollo/single-types.service";
import { ImageService } from "../../image.service";
import { GoogleAnalyticsService } from "ngx-google-analytics";

export interface PayTransMethod {
  name: string;
  detail: string;
  iconSrc: string;
  price: number;
  code: string;
  freeFrom: number;
}

@Component({
  selector: 'app-basket-pay-trans',
  templateUrl: './basket-pay-trans.component.html',
})
export class BasketPayTransComponent implements OnInit {

  openModal = false;
  totalProductsPrice = 0;

  @HostListener('window:message', ['$event.data.point'])
  onClick(data) {
    this.openModal = false;
    if (this.transportPlaceArray.controls[0]) {
      this.transportPlaceArray.controls[0].setValue(data)
    }
  }

  payTransForm =  this.formBuilder.group({
    transportCode: [ , Validators.required],
    transportPlaceArray: this.formBuilder.array([]),
    paymentCode: [ , Validators.required ],
  });

  paymentMethods$: Observable<PayTransMethod[]> =
    this.singleTypesService.getPaymentData<{ paymentMethods: PayTransMethod[]}>()
      .pipe(map(d => d.data.paymentMethods));


  transportMethods$: Observable<PayTransMethod[]> =
    this.singleTypesService.getTransportData<{ transportMethods: PayTransMethod[]}>()
      .pipe(map(d => d.data.transportMethods));

  constructor(
    private formBuilder: FormBuilder,
    private basketService: BasketService,
    private singleTypesService: SingleTypesService,
    private imageService: ImageService,
    private $gaService: GoogleAnalyticsService,
  ) {
    this.payTransForm = this.basketService.setPayTransForm(this.payTransForm);
    this.totalProductsPrice = this.basketService.getPrice();
  }

  ngOnInit(): void {
    this.$gaService.event('begin_checkout', 'cart', 'enter transport and payment');
    const a = this.payTransForm.controls['transportCode']
      .valueChanges.subscribe(val => {
        if (val === 'BAL_B') {
          if (this.transportPlaceArray.length == 0) {
            this.transportPlaceArray.push(this.formBuilder.control(undefined, Validators.required));
          }
        } else {
          this.transportPlaceArray.clear();
        }
    });
  }

  get transportPlaceArray() {
    return this.payTransForm.get('transportPlaceArray') as FormArray;
  }

  getPriceText(price: number, freeFrom: number): string {
    const finalPrice = this.totalProductsPrice < freeFrom ? price : 0;
    return finalPrice > 0 ? finalPrice + ' Kč' : 'Zdarma';
  }

  setPaymentPrice(price): void {
    this.basketService.paymentPrice = price
  }

  setTransportPrice(price): void {
    this.basketService.transportPrice = price
  }

  getBase(): string {
    return this.imageService.getImageBase();
  }

  openTransportModal(): void {
    this.openModal = true;
  }
}
