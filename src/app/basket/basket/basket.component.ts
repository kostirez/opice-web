import { Component } from '@angular/core';
import { BasketService, OrderResponse } from "../basket.service";
import { ProductSummary } from "../../product/product.component";
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";

interface BasketStep {
  label: string;
  url: string;
  step: number;
}

const BASKET_STEPS: BasketStep[] = [
  {label: "Přehled", url: 'prehled', step: 0},
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
  orderResponse: OrderResponse | null;
  loading = false;
  pngDataUrl = '';
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
  }

  menuClick(step:number) {
    if (step < this.step) {
      this.basketService.setState(step);
    }
  }

  nextStep() {
    this.basketService.moveForward();
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  stepBack() {
    this.basketService.moveBack();
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
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
    return price > 0 ? price + 'Kč' : 'Zdarma';
  }

  order() {
    const order$ = this.basketService.order();
    if (order$){
      this.loading = true;
      order$.subscribe(orderResponse => {
        this.loading = false;
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        this.orderResponse = orderResponse;
        this.pngDataUrl = 'data:image/png;base64,' + orderResponse.image;
        this.basketService.moveForward();
        this.basketService.deleteBasket()
      })
    }

  }
}
