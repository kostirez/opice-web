import { Component } from '@angular/core';
import { BasketService } from "../basket.service";
import { ProductInfo, ProductSummary } from "../../product/product.component";

@Component({
  selector: 'app-basket-icon',
  templateUrl: './basket-icon.component.html',
})
export class BasketIconComponent {
  itemsCount: number = 0;
  // products: ProductInfo[] = [];

  constructor(private basketService: BasketService) {
    this.itemsCount = this.calculateProductCount(this.basketService.getAllProdct());
    this.basketService.productsObs
      .subscribe(items => {
        this.itemsCount = this.calculateProductCount(items);
      });
  }

  calculateProductCount(summary: ProductSummary[]): number {
    return summary.reduce((sum, current) => sum + current.count, 0);
  }
}
