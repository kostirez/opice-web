import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ProductSummary } from "../../product/product.component";
import { BasketService } from "../basket.service";

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
})
export class BasketSummaryComponent {


  infoForm =  this.formBuilder.group({
    street: [ '', [Validators.required] ],
    city: [ '', Validators.required ],
    postCode: [ '', Validators.required ],
    email: [ '', [Validators.required,  Validators.email]],
    name: [ '', Validators.required ],
    tel: [ '', Validators.required ],
  });

  products: ProductSummary[] = [];

  constructor(
    private basketService: BasketService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.products = this.basketService.getAllProdct();
    this.infoForm = this.basketService.setInfoForm(this.infoForm);
  }
}
