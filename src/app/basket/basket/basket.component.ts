import { Component } from '@angular/core';
import { BasketService, Order } from "../basket.service";
import { ProductSummary } from "../../product/product.component";
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";

interface BasketStep {
  label: string;
  url: string;
  step: number;
}

const BASKET_STEPS: BasketStep[] = [
  {label: "Prehled", url: 'prehled', step: 0},
  {label: "Doprava a platba", url: 'doprava-a-platba', step: 1},
  {label: "Souhrn", url: 'souhrn', step: 2},
]

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
})
export class BasketComponent {
  step: number = 0;
  products: ProductSummary[] = [];
  basketSteps = BASKET_STEPS;
  orderResponse: Order | null;
  payment: {type: string, invoiceId: number};

  termsForm =  this.formBuilder.group({
    term: [ ,[ Validators.required ]],
    gdpr: [],
  });

  constructor(
    private basketService: BasketService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.products = this.basketService.getAllProdct()
    this.basketService.initState();
    this.basketService.state$.subscribe(s => this.step = s);
    this.basketService.setTermForm(this.termsForm);
    this.orderResponse = this.basketService.orderResponse;

    // this.router.events
    //   .subscribe((event) => {
    //     if (event instanceof NavigationEnd) {
    //        todo tlacitko zpet v browsru
    //     }
    //   });
  }

  menuClick(step:number) {
    if (step < this.step) {
      this.basketService.setState(step);
    }
  }

  nextStep() {
    this.basketService.moveForward();
  }

  stepBack() {
    this.basketService.moveBack()
  }

  goToEshop() {
    this.router.navigate(['../eshop']);
  }

  goToHome() {
    this.router.navigate(['../home'] );
  }

  getProductsPrice(): number  {
    return this.basketService.getPrice()
  }

  getTransportPrice(): number | undefined  {
    return this.basketService.transportPrice ?? undefined;
  }

  getPaymentPrice(): number | undefined {
    return this.basketService.paymentPrice ?? undefined;
  }

  getPrice(): number | undefined{
    let payment = this.getPaymentPrice();
    payment = payment ?? 0;
    let transport = this.getTransportPrice();
    transport = transport ?? 0;
    return transport + payment + this.getProductsPrice();

  }

  getPriceText(price: number): string {
    return price > 0 ? price + 'Kc' : 'Zdarma';
  }

  order() {
    const order$ = this.basketService.order();
    if (order$){
      order$.subscribe(o => {
        this.orderResponse = o.data.attributes;
        console.log('order', o.data.attributes);
        this.payment = {type: this.orderResponse.paymentCode, invoiceId: this.orderResponse.invoice_id};
        console.log('payment', this.payment);
        this.basketService.moveForward();
        this.basketService.deleteBasket()
      })
    }

  }
}
