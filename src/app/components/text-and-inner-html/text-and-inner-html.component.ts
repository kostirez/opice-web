import { Component, Input } from '@angular/core';
import { BaseComponent } from "../base/base.component";

@Component({
  selector: 'app-text-and-inner-html',
  templateUrl: './text-and-inner-html.component.html',
})
export class TextAndInnerHTMLComponent extends BaseComponent {
  @Input() override data: {
    items: {
      text: string,
      html: string,
    }[],

  }
}
