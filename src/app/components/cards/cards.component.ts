import { Component, Inject, Input } from '@angular/core';
import { Card } from "../../model/view";
import { DOCUMENT } from "@angular/common";
import { ImageService } from "../../image.service";
import { BaseComponent } from "../base/base.component";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
})
export class CardsComponent extends BaseComponent {
  @Input() override data: {cards: Card[], head: string};

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private imageService: ImageService
    ) {
    super();
  }

  goTo(link: string): void {
    this.document.location.href = link;
  }

  getBase(): string {
    return this.imageService.getImageBase();
  }
}
