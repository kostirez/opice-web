import { Component, Inject } from '@angular/core';
import { DOCUMENT } from "@angular/common";

export interface ViewItem {
  head: string;
  description: string;
  imgSrc: string;
  btnLabel?: string;
  btnRedirect?: string;
}

const VIEW_ITEMS: ViewItem[] = [
  {
    head: 'Klicici misky a sklenice',
    description: 'Nabízíme kličící misky a sklenice vlastní výroby na domací použití. vypěstujte si microgreens primodoma všechny produkty tiskneme na 3D tiskárnách a pečlivě testujeme aby byli co možná nejvhodnejší na pěstování.',
    imgSrc: '/assets/oval.JPG',
    btnLabel: 'nabidka sklenic a misek',
    btnRedirect: '/eshop',
  },
  {
    head: 'microgreens az domu',
    description: 'Pokud neholdujete pestovani doma ale prestosi chcete vychtnat microgreens mame tu sluzbu primmo pro vas\n' +
      '\n' +
      'objednat si muzete box s naklicenymi bylinkami vlastniho vyberu. box vam privezeme az k vam domu \n' +
      '\n' +
      'Chutnalo vam? muzeme se dohodnout na pravidelny odber za zvyhodnenou cenu.',
    imgSrc: '/assets/oval.JPG',
    btnLabel: 'nabidka microgreens',
    btnRedirect: '/eshop/microgreens',
  },
  {
    head: 'Pro restaurace',
    description: 'Chteli by jste obohatit vase jidla o novy zdravy prvek? klicky jsou idealni jako ozdoba ale i vyrazny prvek na vasem jidle \n' +
      '\n' +
      'pro restaurace nabizime pravidelne dodavky microgreens. klicky privezeme az k vam do restaurace.\n' +
      '\n' +
      'Muzete si vybrat jestli chcete klicky privest primo na pestebnim mediu a nebo uz sklizene v krabickach\n' +
      '\n' +
      'Prvni dodavk vam privezeme zcela zdarma aby jste mohli vse ochutnat a rozhodnout o jake roztlinky mate zajem.',
    imgSrc: '/assets/oval.JPG',
    btnLabel: 'Vice informaci',
    btnRedirect: '/pro-restaurace',
  },

]


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  slides = [
    '/assets/meals/hrasek.jpg',
    '/assets/meals/salat.jpg',
    '/assets/meals/polevka.jpg'
  ];

  restaurants: string[] = [
    "Dodáváme microgreens do restaurací, i na jednorázové akce",
    "Dodáváme microgreens do restaurací, i na jednorázové akce",
    "Dodáváme microgreens do restaurací, i na jednorázové akce",
    "Dodáváme microgreens do restaurací, i na jednorázové akce",
    "Rozvážíme v centru prahy zdarma",
    "Testovaci set zdarma",
  ];

  viewItems = VIEW_ITEMS;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  goTo(link: string): void {
    this.document.location.href = link;
  }


}

