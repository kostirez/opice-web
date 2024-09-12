import { Component, Input } from '@angular/core';
import { BaseComponent } from "../base/base.component";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
})
export class FaqComponent extends BaseComponent {
  @Input() override data: {
    head: string;
    faqs: {
      question: string,
      answer: string
    }[];
  }

  activeIndex: number | null = null;

  toggleAnswer(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }
}


