import { Component, Input } from '@angular/core';

export interface NavBtn {
  label: string;
  url: string;
}

const NAV_BTNS: NavBtn[] = [
  {label: "misky", url: "/eshop/misky"},
  {label: "sklenice", url: "/eshop/sklenice"},
  {label: "microgreens", url: "/eshop/microgreens"},
]


@Component({
  selector: 'app-product-category-nav',
  templateUrl: './product-category-nav.component.html',
  styleUrl: './product-category-nav.component.scss'
})
export class ProductCategoryNavComponent {
  @Input() actual: string = '';

  navBtns = NAV_BTNS;
}
