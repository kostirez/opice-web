import { Component } from '@angular/core';
import { NavigationEnd, NavigationError, Router } from "@angular/router";
import { MenuItem } from "../model/view";
import { BasketService } from "../basket/basket.service";
import { ProductSummary } from "../product/product.component";


const DEFAULT_LABEL = "Zrzavá opice";

const MENU_ITEMS: MenuItem[] = [
  {head: DEFAULT_LABEL, url: '/'},
  {head: 'eshop', url: '/eshop'},
  {head: 'pro restaurace', url: '/pro-restaurace'},
  {head: 'doprava a platba', url: '/doprava-a-platba'},
  {head: 'kontakty', url: '/kontakty'},
  {head: 'dokumenty', url: '/dokumenty'},
];

const SUB_ITEMS: MenuItem[] = [
  {head: 'sklenice', url: '/eshop/sklenice'},
  {head: 'misky', url: '/eshop/misky'},
  {head: 'microgreens', url: '/eshop/microgreens'},
];

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  menuItems = MENU_ITEMS;
  menuSubItems = SUB_ITEMS

  navbarOpen = false;

  currentPage=DEFAULT_LABEL;

  showBasketIcon = false;

  itemsCount = 0;

  constructor(
    private router: Router,
    private basketService: BasketService,
  ) {}

  ngOnInit() {
    this.router.events
    .subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showBasketIcon =
          event.url !== '/kosik';
        this.currentPage = this.menuItems.find(item => item.url === event.url)?.head ?? DEFAULT_LABEL;
        if (this.currentPage == DEFAULT_LABEL) {
          this.currentPage = this.menuSubItems.find(item => item.url === event.url)?.head ?? DEFAULT_LABEL;
        }
      }
      if (event instanceof NavigationError) {
        console.log(event.error);
      }
    });
    this.basketService.productsObs
      .subscribe(items => {
        this.itemsCount = this.calculateProductCount(items);
      });
  }

  calculateProductCount(summary: ProductSummary[]): number {
    return this.basketService.calculateProductCount(summary);
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
    this.showBasketIcon = !this.navbarOpen;
  }

  closeNavBar() {
    this.navbarOpen = false;
  }
}
