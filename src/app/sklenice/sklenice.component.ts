import { Component } from '@angular/core';
import { ProductInfo } from "../product/product.component";
import { map, Observable, Subscription, tap } from "rxjs";
import { StrapiGraphqlService } from "../apollo/strapi-graphql.service";
import { addFilter, PRODUCTS } from "../apollo/queries";



@Component({
  selector: 'app-sklenice',
  templateUrl: './sklenice.component.html',
  styleUrl: './sklenice.component.scss'
})
export class SkleniceComponent {

  loading = true;
  params = addFilter('(filters: { category: { eq: "sklenice" } })',PRODUCTS);
  products$: Observable<ProductInfo[]> = this.strapiGraphqlService.fetch<ProductInfo[]>(this.params)
    .pipe(
      tap(val => this.loading = val.loading),
      map(d => d.data));


  constructor(
    private strapiGraphqlService: StrapiGraphqlService,
  ) {}
}
