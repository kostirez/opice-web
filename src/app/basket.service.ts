import { Injectable } from '@angular/core';
import { ProductSummary } from "./product/product.component";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private products: ProductSummary[] = [
    {
      name: 'mala sklenice 267ml',
      size: '-',
      color: 'modra',
      count: 2,
      priceForOne: 139,
    },
    {
      name: 'name',
      size: 'size',
      color: 'zelena',
      count: 3,
      priceForOne: 111,
    },
    {
      name: 'name',
      size: '22',
      color: 'oranzova',
      count: 1,
      priceForOne: 200,
    }
  ];

  private productsSubject: Subject<ProductSummary[]> = new Subject<ProductSummary[]>();
  public productsObs: Observable<ProductSummary[]> = this.productsSubject.asObservable();
  constructor() {
    this.productsSubject.next([]);
  }

  addProduct(product: ProductSummary) {
    const index = this.products.findIndex(p => p.name==product.name && p.color == product.color && p.size == product.size);
    if (index < 0) {
      this.products.push(product);
    } else {
      this.products[index].count += 1;
    }
    this.productsSubject.next(this.products)
    console.log('product added', this.products)
  }

  getAllProdct(): ProductSummary[] {
    return this.products;
  }

  getPrice(): number {
    return this.products.reduce((sum, current) => sum + current.priceForOne * current.count, 0);
  }


  removeOneProdctSummary(product: ProductSummary) {
    const index = this.products.findIndex(p => p.name==product.name && p.color == product.color && p.size == product.size);
    this.products.splice(index, 1);
    this.productsSubject.next(this.products);

  }
}
