import { Component, Inject, Input } from '@angular/core';
import { BaseComponent } from "../base/base.component";
import { BtnData, Card } from "../../model/view";
import { DOCUMENT } from "@angular/common";
import { ImageService } from "../../image.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-cards-with-text',
  templateUrl: './cards-with-text.component.html',
})
export class CardsWithTextComponent extends BaseComponent {
  @Input() override data: {
    cards: Card[],
    head: string,
    text: string,
    btn: BtnData
  };

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private imageService: ImageService,
    private router: Router,
  ) {
    super();
  }

  getBase(): string {
    return this.imageService.getImageBase();
  }

  goTo(link: string): void {
    if(!link){
      return;
    }
    this.router.navigate([ '/', ...link.split('/') ])
  }

}
