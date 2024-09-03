import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { BasketService } from "../basket/basket.service";
import { ProductSummary } from "../product/product.component";
import { animate, style, transition, trigger } from "@angular/animations";
import { MenuItem, PageService } from "../components/services/page.service";
import { combineLatest, map, Observable, tap } from "rxjs";


const DEFAULT_LABEL = "Zrzavá opice";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style({transform: 'translateY(-90%)'}),
        animate('0.4s ease-out', style({transform: 'translateY(0%)'}))
        ]),
      transition(':leave', [
        style({transform: 'translateY(0%)'}),
        animate('0.4s ease-out', style({transform: 'translateY(-100%)', opacity: 0}))
      ]),
    ])
  ],
})
export class MenuComponent {
  menuItemsToShow$: Observable<MenuItem[]> = this.pageService.getMenu$()
    .pipe(
        map(items => items
          .filter(item => item.showInMenu)
          .sort((a, b) =>  a.menuOrder - b.menuOrder)
        )
     );
  menuItems$: Observable<MenuItem[]> = this.pageService.getMenu$()

  private _navbarOpen = false;
  get navbarOpen() {
    return this._navbarOpen;
  }

  set navbarOpen(value: boolean) {
    this._navbarOpen = value;
  }

  currentPage=DEFAULT_LABEL;

  itemsCount = 0;

  constructor(
    private basketService: BasketService,
    private pageService: PageService,
    private route: ActivatedRoute,
  ) {
    combineLatest([
    this.route.url.pipe(map((segments) => segments.join('/'))),
    this.menuItems$
  ]).pipe(
      tap((result) => {
        const currentPath = result[0] as string;
        const found = result[1]
          .filter(item => item.path === currentPath);
        if (found && found[0] && found[0].id) {
          this.currentPage = found[0].name;
        } else {
          this.currentPage = DEFAULT_LABEL;
        }
      }
    )
  ).subscribe();
}

  calculateProductCount(summary: ProductSummary[]): number {
    return this.basketService.calculateProductCount(summary);
  }

  setNavbar(value: boolean) {
    this.navbarOpen = value
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  closeNavBar() {
    this.navbarOpen = false;
  }
}
