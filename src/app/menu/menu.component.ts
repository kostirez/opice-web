import { Component } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";

export interface MenuItem {
  name: string;
  url: string;
}
const DEFAULT_LABEL = "Zrzavá opice";

const MENU_ITEMS: MenuItem[] = [
  {name: DEFAULT_LABEL, url: '/'},
  {name: 'eshop', url: '/eshop'},
  {name: 'pro restaurace', url: '/pro-restaurace'},
  {name: 'doprava a platba', url: '/doprava-a-platba'},
  {name: 'kontakty', url: '/kontakty'},
  {name: 'dokumenty', url: '/dokumenty'},
];

const SUB_ITEMS: MenuItem[] = [
  {name: 'sklenice', url: '/eshop/sklenice'},
  {name: 'misky', url: '/eshop/misky'},
  {name: 'microgreens', url: '/eshop/microgreens'},
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

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
    .subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPage = this.menuItems.find(item => item.url === event.url)?.name ?? DEFAULT_LABEL;
        if (this.currentPage == DEFAULT_LABEL) {
          this.currentPage = this.menuSubItems.find(item => item.url === event.url)?.name ?? DEFAULT_LABEL;
        }
        this.showBasketIcon = this.currentPage !== 'kosik';
      }
      if (event instanceof NavigationError) {
        console.log(event.error);
      }
    });
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  closeNavBar() {
    this.navbarOpen = false;
  }
}
