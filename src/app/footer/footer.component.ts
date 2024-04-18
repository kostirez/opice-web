import { Component, Inject } from '@angular/core';
import { DOCUMENT } from "@angular/common";

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  goToFb(): void {
    this.document.location.href = 'https://www.facebook.com/profile.php?id=61557278573442';
  }

  goToIg(): void {
    this.document.location.href = 'https://www.instagram.com/zrzavaopice/';
  }

  goToPi(): void {
    this.document.location.href = 'https://cz.pinterest.com/zrzavaopice/';
  }
}
