import { Component } from '@angular/core';
import { BasketService } from "../basket.service";
import { ProductSummary } from "../../product/product.component";
import { filter, map, tap } from "rxjs";
import { NavigationEnd, Router } from "@angular/router";

@Component({
  selector: 'app-basket-icon',
  templateUrl: './basket-icon.component.html',
})
export class BasketIconComponent {
  itemsCount: number = 0;
  hideIcon = false;

  constructor(
    private basketService: BasketService,
    private router: Router,
  ) {
    this.itemsCount = this.calculateProductCount(this.basketService.getAllProdct());
    this.basketService.productsObs
      .subscribe(items => {
        this.itemsCount = this.calculateProductCount(items);
      });
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.url),
      tap(value => {
        this.hideIcon = value === '/kosik';
      })
    ).subscribe();
  }

  calculateProductCount(summary: ProductSummary[]): number {
    return this.basketService.calculateProductCount(summary);
  }
}
