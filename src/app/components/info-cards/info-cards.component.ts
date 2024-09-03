import { Component, Input } from '@angular/core';
import { BaseComponent } from "../base/base.component";

@Component({
  selector: 'app-info-cards',
  templateUrl: './info-cards.component.html',
})
export class InfoCardsComponent extends BaseComponent{
  @Input() override data: {
    head: string,
    cards: {
      head: string,
      text: string,
      btnText: string,
      btnLink: string,
    }[],
  }

}
