import { Component, Input, OnInit } from '@angular/core';
import { BasketService } from "../basket/basket.service";
import { PicArray } from "../model/view";
import { Observable, of } from "rxjs";

export interface Color {
  name: string;
  code: string;
}

export interface Size {
  name: string;
  picSrc: string;
}


export interface ProductInfo {
  name: string;
  description: string;
  detail: string;
  colors: Color[];
  sizes: Size[];
  price: number;
  pictures: PicArray;
}

export interface ProductSummary {
  name: string;
  color: string;
  size: string;
  count: number;
  priceForOne: number;
}


@Component({
  selector: 'product-box',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{
  @Input({ required: true }) productInfo!: ProductInfo;
  @Input() sizeLabel: string = '';

  showDetail = false;
  detailText: string = 'zobrazit';

  slides: PicArray = [];

  selectedColor: string | null = null;
  selectedSize: string | null = null;

  colorErr: string = '';
  sizeErr: string = '';

  constructor(private basketService: BasketService) {
  }


  ngOnInit(): void {
    this.slides = this.productInfo.pictures;
  }


  detailClick() {
    this.showDetail=!this.showDetail;
    this.detailText = this.showDetail ? "skryt" : "zobrazit";
  }

  addToBasket(product: ProductInfo) {
    if(!this.selectedColor) {
      this.colorErr = 'vyber barvu';
    }
    if(!this.selectedSize && this.sizeLabel) {
      this.sizeErr = 'vyber velikost';
    }
    if (this.colorErr || this.sizeErr) {
      return;
    } else {
      this.basketService.addProduct(
        {
          name: product.name,
          size: this.selectedSize!,
          color: this.selectedColor!,
          count: 1,
          priceForOne: product.price,
        }
      )
    }
  }

  selectColor(colorName: string) {
    this.selectedColor = colorName;
    this.colorErr = '';
  }

  selectSize(sizeName: string) {
    this.selectedSize = sizeName;
    this.sizeErr = '';
  }

  getObsSlides(slides: PicArray): Observable<PicArray> {
    return of(slides);
  }


}
