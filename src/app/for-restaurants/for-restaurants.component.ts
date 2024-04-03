import { Component, ViewChild } from '@angular/core';
import { ViewItem } from "../home/home.component";

const FAQ: ViewItem[] = [
  {
    head: 'Ochutnejte',
    description: 'Jako první krok Vám přivezeme náš ochutnávkový box se vším, co pěstujeme. Dodávka je zcela zdarma a vy si v klidu můžete rozmyslet co se vám líbí a chutná',
    imgSrc: 'assets/hex.JPG',
  },
  {
    head: 'Objednejte',
    description: 'Vyberete o jaké druhy microgreens a v jakém množství máte zájem. Dohodneme data dodání a o nic dalšího se nemusíte starat',
    imgSrc: 'assets/hex.JPG',
  },
  {
    head: 'Dostávejte',
    description: 'Domluvené množství microgreens vám budeme vozit až do vaší restaurace, přesně jak jsme se domluvili.',
    imgSrc: 'assets/hex.JPG',
  },
  ];

const FAQ_2: ViewItem[] = [
  {
    head: 'Pravidelný dovoz',
    description: 'Pravidelně dovážet do vaší restaurace čerstvé microgreens',
    imgSrc: 'assets/hex.JPG',
  },
  {
    head: 'Jednorázové akce',
    description: 'Napěstujeme microgreens pro vaší akci.',
    imgSrc: 'assets/hex.JPG',
  },
  {
    head: 'Rozvoz po centru prahy',
    description: 'Microgreens rozvážíme v rámci centra prahy zdarma.',
    imgSrc: 'assets/hex.JPG',
  },
  {
    head: 'Pravidelný dovoz',
    description: 'Pravidelně dovážet do vaší restaurace čerstvé microgreens',
    imgSrc: 'assets/hex.JPG',
  },
  {
    head: 'Jednorázové akce',
    description: 'Napěstujeme microgreens pro vaší akci.',
    imgSrc: 'assets/hex.JPG',
  },
  {
    head: 'Rozvoz po centru prahy',
    description: 'Microgreens rozvážíme v rámci centra prahy zdarma.',
    imgSrc: 'assets/hex.JPG',
  },
];

interface MicrogreensOption {
  name: string;
  picSrc: string;
}

const MICROGREENS_OPTIONS: MicrogreensOption[] = [
  {
    name: 'Vojteska',
    picSrc: 'assets/harvest/alfa.JPG',
  },
  {
    name: 'Rericha',
    picSrc: 'assets/harvest/rericha.JPG',
  },
  {
    name: 'Rukola',
    picSrc: 'assets/harvest/rukola.JPG',
  },
  {
    name: 'redkvicka',
    picSrc: 'assets/harvest/redkvicka.JPG',
  },
  {
    name: 'Hrasek',
    picSrc: 'assets/harvest/hrasek.JPG',
  },
]

@Component({
  selector: 'app-for-restaurants',
  templateUrl: './for-restaurants.component.html',
  styleUrl: './for-restaurants.component.scss'
})
export class ForRestaurantsComponent {

  slides = [
    '/assets/meals/hrasek.jpg',
    '/assets/meals/polevka.jpg',
    '/assets/meals/salat.jpg',
  ];

  viewItems = FAQ;
  viewItems_2 = FAQ_2;

  micrgreensOptions = MICROGREENS_OPTIONS

}
