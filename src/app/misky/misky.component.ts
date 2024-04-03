import { Component } from '@angular/core';
import { ProductInfo } from "../product/product.component";
import { NavBtn } from "../product-category-nav/product-category-nav.component";

const PRODUCTS: ProductInfo[] = [
  {
    name: 'Hexagon klíčící sítko s miskou',
    description: 'Šestiúhelníkové sítko o průměru 8 cm ve variantě pro malá nebo velká semínka',
    detail: '\n' +
      '\n' +
      'Šestiúhelníkové sítko vytisknuté na 3D tiskárně nabízíme ve 2 variantách hustoty sítka dle velikosti semínek. Tenké plastové sítko zaručuje ideální podmínky pro klíčení semínek. Sítko je designováno tak, aby vzrostlé klíčky šlo vytáhnout bez poškození kořínků, klíčky tak můžete lehce přesadit a nechat dále růst.\n' +
      '\n' +
      'Součástí výrobku je miska na vodu, do které sítko přesně zapadne. Miska je hluboká 12mm, což zaručuje dostatečné místo pro kořínky prorůstající skrz sítko.\n' +
      '\n' +
      'Varianty:\n' +
      '\n' +
      '    Pro malá semínka: typově vojtěška, rukola, bazalka, atd.\n' +
      '    Pro větší semínka: typově ředkev, ředkvička, čočka atd.\n' +
      '\n' +
      'K výrobku je přiložen stručný návod k použití a údržbě.\n' +
      '\n' +
      'Tisk probíhá na moderních 3D tiskárnách, tak aby byl výsledný produkt co nejlepší kvality. Výrobek dále neupravujeme a tak je vidět klasická struktura typická pro 3D tisk. Pro tisk použiváme PLA filament certifikovaný pro styk s potravinami.\n' +
      '\n' +
      'Sítko ani misku nevystavujte teplotám nad 50°C\n',
    colors: [
      {name: 'modra', code: '#246dd7'},
      {name: 'oranzova', code: '#f1854f'},
      {name:'seda', code: '#9f9f9f'},
      {name: 'bila', code: '#ffffff'},
      {name: 'pruhledna', code: '#dad9d9'},
    ],
    sizes: [
      {
        name: 'pro mala seminka',
        picSrc: 'assets/pi.svg'
      },
      {
        name: 'pro velka seminka',
        picSrc: 'assets/pi.svg'
      }
    ],
    price: 139,
    picSrc: ['assets/pi.svg', 'assets/pi.svg','assets/pi.svg']
  },
  {
    name: 'Kulaté klíčící sítko s miskou',
    description: 'kulaté sítko o průměru 10cm ve variantě pro malá nebo velká semínka',
    detail: '\n' +
      '\n' +
      'Kulaté sítko vytisknuté na 3D tiskárně nabízíme ve 2 variantách hustoty sítka dle velikosti semínek. Tenké plastové sítko zaručuje ideální podmínky pro klíčení semínek. Sítko je designováno tak, aby vzrostlé klíčky šlo vytáhnout bez poškození kořínků, klíčky tak můžete lehce přesadit a nechat dále růst. Povrch sítka je rozdělený na 2 časti tak, aby bylo možné klíčit 2 druhy semínek najednou.\n' +
      '\n' +
      ' \n' +
      '\n' +
      'Součástí výrobku je miska na vodu, do které sítko přesně zapadne. Miska je hluboká 12mm, což zaručuje dostatečné místo pro kořínky prorůstající skrz sítko.\n' +
      '\n' +
      ' \n' +
      '\n' +
      'Varianty:\n' +
      '\n' +
      '    Pro malá semínka: typově vojtěška, rukola, bazalka, atd.\n' +
      '    Pro větší semínka: typově ředkev, ředkvička, čočka atd.\n' +
      '\n' +
      ' \n' +
      '\n' +
      'K výrobku je přiložen stručný návod k použití a údržbě.\n' +
      '\n' +
      ' \n' +
      '\n' +
      'Tisk probíhá na moderních 3D tiskárnách, tak aby byl výsledný produkt co nejlepší kvality. Výrobek dále neupravujeme a tak je vidět klasická struktura typická pro 3D tisk. Pro tisk použiváme certifikovaný PLA filament pro styk s potravinami.\n' +
      '\n' +
      ' \n' +
      '\n' +
      'Sítko nevystavujte teplotám nad 50°C\n',
    colors: [
      {name: 'modra', code: '#246dd7'},
      {name: 'oranzova', code: '#f1854f'},
      {name:'seda', code: '#9f9f9f'},
      {name: 'bila', code: '#ffffff'},
      {name: 'pruhledna', code: '#dad9d9'},
    ],
    sizes: [],
    price: 209,
    picSrc: [
      'assets/products/rozmery.jpg',
      'assets/products/seminka.jpg',
      'assets/products/velikosti.jpg',
      'assets/products/barvy.jpg',]
  }
];

@Component({
  selector: 'app-misky',
  templateUrl: './misky.component.html',
  styleUrl: './misky.component.scss'
})
export class MiskyComponent {
  products = PRODUCTS;
  navBtns: NavBtn[] = [
    {label: "microgreens", url: "/eshop/microgreens"},
    {label: "sklenice", url: "/eshop/sklenice"}
  ];

  aktual = "misky";
}
