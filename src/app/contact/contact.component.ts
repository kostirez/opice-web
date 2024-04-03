import { Component, Inject } from '@angular/core';
import { DOCUMENT } from "@angular/common";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
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
