import { Component } from '@angular/core';
import { MenuItem } from "../menu/menu.component";
import { Router } from "@angular/router";


const ESHOP_ITEMS: (MenuItem & {img: string})[] = [
  {name: 'Klíčící sklenice', url: '/eshop/sklenice', img: 'assets/sklenicka.JPG'},
  {name: 'Klíčící misky', url: '/eshop/misky', img: 'assets/oval.JPG'},
  {name: 'microgreens', url: '/eshop/microgreens', img: 'assets/oval.JPG'},
];

@Component({
  selector: 'app-eshop',
  templateUrl: './eshop.component.html',
  styleUrl: './eshop.component.scss'
})
export class EshopComponent {
    eshopItems = ESHOP_ITEMS;

    constructor(private router: Router) {
    }

  goTo(url: string) {
    this.router.navigate([url]);
    console.log(url)
  }
}
