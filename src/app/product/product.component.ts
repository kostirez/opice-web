import { Component, Input, OnInit } from '@angular/core';
import { BasketService } from "../basket/basket.service";
import { PicArray } from "../model/view";
import { Observable, of } from "rxjs";
import { ImageService } from "../image.service";

export interface Color {
  name: string;
  code: string;
}

export interface Size {
  name: string;
  picSrc: string;
}

export interface ProductDetail {
  name: string;
  text: string;
  pics: PicArray;
}

export interface ProductInfo {
  name: string;
  description: string;
  detail: string;
  colors: Color[];
  sizes: Size[];
  sizeLabel: string;
  price: number;
  pictures: PicArray;
  details: ProductDetail[];
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
})
export class ProductComponent implements OnInit{
  @Input({ required: true }) productInfo!: ProductInfo;
  @Input() sizeLabel: string = '';

  slides: PicArray = [];

  selectedColor: string | null = null;
  selectedSize: string | null = null;
  selectedDetail: ProductDetail | null = null;

  colorErr: string = '';
  sizeErr: string = '';
  justAdded = false;

  constructor(
    private basketService: BasketService,
    private imageService: ImageService,
    ) {
  }

  ngOnInit(): void {
    this.slides = this.productInfo.pictures;
  }


  addToBasket(product: ProductInfo) {
    if(!this.selectedColor) {
      this.colorErr = 'Vyberte barvu';
    }
    if(!this.selectedSize && this.productInfo.sizeLabel) {
      this.sizeErr = 'Vyberte velikost';
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
      );
      this.justAddedAnimation()
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

  justAddedAnimation(){
    this.justAdded = true;
    window.setTimeout(() =>{
        this.justAdded = false;
    }, 1000);
  }

  detailBtnClick(btn: ProductDetail): void {
    this.selectedDetail = btn;
  }

  closeDetail() {
    this.selectedDetail = null;
  }

  getBase(): string {
    return this.imageService.getImageBase();
  }
}
