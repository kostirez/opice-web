import { Component, Inject, Input } from '@angular/core';
import { Card } from "../../model/view";
import { DOCUMENT } from "@angular/common";
import { ImageService } from "../../image.service";
import { BaseComponent } from "../base/base.component";
import { Router } from "@angular/router";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
})
export class CardsComponent extends BaseComponent {
  @Input() override data: {
    cards: Card[],
    head: string,
    size: string,
  };

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private imageService: ImageService,
    private router: Router,
    ) {
    super();
  }

  goTo(link: string): void {
    this.router.navigate([ '/', ...link.split('/') ])
  }

  getBase(): string {
    return this.imageService.getImageBase();
  }
}
