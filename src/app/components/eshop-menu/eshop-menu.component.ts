import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from "../base/base.component";

@Component({
  selector: 'app-eshop-menu',
  templateUrl: './eshop-menu.component.html',
})
export class EshopMenuComponent extends BaseComponent implements OnInit{
  @Input() override data: {
    head: string,
    items: {
      head: string,
      link: string,
    }[],
  };

}
