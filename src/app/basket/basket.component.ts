import { Component } from '@angular/core';
import { BasketService } from "../basket.service";
import { ProductSummary } from "../product/product.component";
import { Router } from "@angular/router";

export interface Transport {
  name: string;
  detail: string;
  iconSrc: string;
  price: number;
}

export interface PaymentMethod {
  name: string;
  detail: string;
  iconSrc: string;
  price: number;
}

interface BasketStep {
  label: string;
  step: number
}

const BASKET_STEPS: BasketStep[] = [
  {label: "Prehled", step: 0},
  {label: "Doprava a platba", step: 1},
  {label: "Souhrn", step: 2},
]

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent {
  step: number = 1;
  products: ProductSummary[] = [];
  basketSteps = BASKET_STEPS;

  transport: Transport[] = [
    {name: 'ceska posta na postu', detail: 'detail info o doprave', iconSrc: '/assets/fb.svg', price: 12},
    {name: 'ceska posta na adresu', detail: 'detail info o doprave', iconSrc: '/assets/fb.svg', price: 12},
    {name: 'zasilkovna do boxu', detail: 'detail info o doprave', iconSrc: '/assets/fb.svg',price: 12},
    {name: 'zasilkovna na adresu', detail: 'detail info o doprave', iconSrc: '/assets/fb.svg', price: 12},
    {name: 'osobni vyzvednuti', detail: 'detail info o doprave', iconSrc: '/assets/fb.svg', price: 0},
  ];

  paymentMethods: PaymentMethod[] = [
    {name: 'hotove', detail: 'detail info o platbe', iconSrc: '/assets/fb.svg', price: 0},
    {name: 'prevodem', detail: 'detail info o platbe', iconSrc: '/assets/fb.svg', price: 0},
    {name: 'dobirkou', detail: 'detail info o platbe', iconSrc: '/assets/fb.svg', price: 30},
  ];

  selectedTransport: string | null = null;
  selectedPayment: string | null = null;

  constructor(
    private basketService: BasketService,
    private router: Router
  ) {}

  ngOnInit() {
    this.products = this.basketService.getAllProdct()
    // this.basketService.productsObs.subscribe(p => {
    //   console.log('pro', p);
    //   this.products = p;
    // });
  }

  setStep(num: number) {
    this.step = num;
  }

  nextStep() {
    this.step += 1;
  }

  stepBack() {
    this.step -= 1;
    if (this.step < 0) {
      this.router.navigate(['/eshop']);
    }
  }

  goToEshop() {
    this.router.navigate(['/eshop']);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }


  disableNextStep(): boolean {
    if (this.step === 1){
      return !this.selectedPayment || !this.selectedTransport
    }
    return false;
  }



  getProductsPrice(): number  {
    return this.basketService.getPrice()
  }

  getTransportPrice(): number | undefined  {
    const transport = this.transport.find(t => t.name === this.selectedTransport);
    return transport ? transport.price : undefined;
  }

  getPaymentPrice(): number | undefined {
    const payment = this.paymentMethods.find(p => p.name === this.selectedPayment);
    return payment ? payment.price : undefined;
  }

  getPrice(): number | undefined{
    let payment = this.getPaymentPrice();
    payment = payment ?? 0;
    let transport = this.getTransportPrice();
    transport = transport ?? 0;
    return transport + payment + this.getProductsPrice();

  }

  selectTransport(name: string) {
    this.selectedTransport = name;
  }

  selectPayment(name: string) {
    this.selectedPayment = name;
  }

  getPriceText(price: number): string {
    return price > 0 ? price + 'Kc' : 'Zdarma';
  }

  removeProduct(product: ProductSummary) {
    this.basketService.removeOneProdctSummary(product)
  }

  order() {
    console.log('objednavam')
    this.nextStep()
  }
}
