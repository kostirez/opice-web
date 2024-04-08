import { Component } from '@angular/core';
import { NavigationEnd, NavigationError, Router } from "@angular/router";
import { MenuItem } from "../model/view";


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

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
    .subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPage = this.menuItems.find(item => item.url === event.url)?.head ?? DEFAULT_LABEL;
        if (this.currentPage == DEFAULT_LABEL) {
          this.currentPage = this.menuSubItems.find(item => item.url === event.url)?.head ?? DEFAULT_LABEL;
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
