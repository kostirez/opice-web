import { Component } from '@angular/core';
import { ProductSummary } from "../../product/product.component";
import { BasketService } from "../basket.service";
@Component({
  selector: 'app-basket-overview',
  templateUrl: './basket-overview.component.html',
})
export class BasketOverviewComponent {

  products: ProductSummary[] = [];

  constructor(
    private basketService: BasketService,
  ) {}

  ngOnInit() {
    this.products = this.basketService.getAllProdct()
  }

  removeProduct(product: ProductSummary) {
    this.basketService.removeOneProdctSummary(product)
  }
}
