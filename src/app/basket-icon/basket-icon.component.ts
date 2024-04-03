import { Component } from '@angular/core';
import { BasketService } from "../basket.service";
import { ProductSummary } from "../product/product.component";

@Component({
  selector: 'app-basket-icon',
  templateUrl: './basket-icon.component.html',
  styleUrl: './basket-icon.component.scss'
})
export class BasketIconComponent {
  itemsCount: number = 0;

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
