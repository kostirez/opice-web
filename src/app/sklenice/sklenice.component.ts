import { Component } from '@angular/core';
import { ProductInfo } from "../product/product.component";
import { NavBtn } from "../product-category-nav/product-category-nav.component";

const PRODUCTS: ProductInfo[] = [
  {
    name: 'mala sklenice',
    description: 'kratky popis',
    detail: 'dlouhy popis',
    colors: [
      {name: 'modra', code: '#246dd7'},
      {name: 'oranzova', code: '#f1854f'},
      {name:'seda', code: '#9f9f9f'},
      {name: 'bila', code: '#ffffff'},
      {name: 'pruhledna', code: '#dad9d9'},
    ],
    sizes: [],
    price: 100,
    picSrc: ['assets/fb.svg', 'assets/ig.svg','assets/pi.svg']
  },
  {
    name: 'velka sklenice',
    description: 'kratky popis',
    detail: 'dlouhy popis',
    colors: [
      {name: 'modra', code: '#246dd7'},
      {name: 'oranzova', code: '#f1854f'},
      {name:'seda', code: '#9f9f9f'},
      {name: 'bila', code: '#ffffff'},
      {name: 'pruhledna', code: '#dad9d9'},
    ],
    sizes: [],
    price: 209,
    picSrc: ['assets/pi.svg', 'assets/fb.svg','assets/ig.svg']
  }
];

@Component({
  selector: 'app-sklenice',
  templateUrl: './sklenice.component.html',
  styleUrl: './sklenice.component.scss'
})
export class SkleniceComponent {
  products = PRODUCTS;
  navBtns: NavBtn[] = [
    {label: "misky", url: "/eshop/misky"},
    {label: "microgreens", url: "/eshop/microgreens"}
  ];
}
