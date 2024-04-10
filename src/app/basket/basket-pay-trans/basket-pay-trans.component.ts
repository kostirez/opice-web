import { Component, HostListener } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { BasketService } from "../basket.service";
import { map, Observable } from "rxjs";
import { SingleTypesService } from "../../apollo/single-types.service";
import { ImageService } from "../../image.service";

export interface PayTransMethod {
  name: string;
  detail: string;
  iconSrc: string;
  price: number;
  code: string;
}

@Component({
  selector: 'app-basket-pay-trans',
  templateUrl: './basket-pay-trans.component.html',
})
export class BasketPayTransComponent {

  openModal = false;

  @HostListener('window:message', ['$event.data.point'])
  onClick(data) {
    this.openModal = false;
    this.payTransForm.patchValue({transportPlace: data})
  }

  payTransForm =  this.formBuilder.group({
    transportCode: [ , Validators.required],
    transportPlace: [],
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
  ) {
    this.basketService.setPayTransForm(this.payTransForm);
  }

  getPriceText(price: number): string {
    return price > 0 ? price + 'Kc' : 'Zdarma';
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
