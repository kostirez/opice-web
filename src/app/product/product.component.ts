import { Component, Input, OnInit } from '@angular/core';
import { BasketService } from "../basket/basket.service";
import { PicArray, ProductOption } from "../model/view";
import { Observable, of } from "rxjs";
import { ImageService } from "../image.service";
import { animate, style, transition, trigger } from "@angular/animations";

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
  id?: string;
  name: string;
  description: string;
  detail: string;
  colors: Color[];
  productOptions: ProductOption[];
  optionLabel: string;
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
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('0.5s ease-out',
              style({ height: '*', opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: '*', opacity: 1 }),
            animate('0.5s ease-in',
              style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class ProductComponent implements OnInit{
  @Input({ required: true }) productInfo!: ProductInfo;
  @Input() set preselectColor(code: string) {
    const color = this.productInfo.colors.find(c => c.code==='#'+code)
    this.selectedColor = color ? color.name: null;
  }

  openDetail = false;

  slides: PicArray = [];

  selectedColor: string | null = null;
  selectedOption: ProductOption | null = null;
  selectedDetail: ProductDetail | null = null;

  colorErr: string = '';
  optionErr: string = '';
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
    if(!this.selectedColor && this.productInfo.colors.length > 0) {
      this.colorErr = 'Vyberte barvu';
    }
    if(!this.selectedOption && this.productInfo.optionLabel) {
      this.optionErr = 'Vyberte možnost';
    }
    if (this.colorErr || this.optionErr) {
      return;
    } else {
      this.basketService.addProduct(
        {
          name: product.name,
          size: this.selectedOption ? this.selectedOption.label! : null,
          color: this.selectedColor!,
          count: 1,
          priceForOne: this.getPrice(),
        }
      );
      this.justAddedAnimation()
    }
  }

  selectColor(colorName: string) {
    this.selectedColor = colorName;
    this.colorErr = '';
  }

  selectOption(option: ProductOption) {
    this.selectedOption = option;
    this.optionErr = '';
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

  getPrice() {
    let price = this.productInfo.price ?? this.productInfo.productOptions[0].price;
    return this.selectedOption && this.selectedOption.price ?
      this.selectedOption.price : price;
  }
}
