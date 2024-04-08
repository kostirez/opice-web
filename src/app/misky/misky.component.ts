import { Component } from '@angular/core';
import { map, Observable, tap } from "rxjs";
import { ProductInfo } from "../product/product.component";
import { StrapiGraphqlService } from "../apollo/strapi-graphql.service";
import { addFilter, PRODUCTS } from "../apollo/queries";

@Component({
  selector: 'app-misky',
  templateUrl: './misky.component.html',
  styleUrl: './misky.component.scss'
})
export class MiskyComponent {

  loading = true;
  params = addFilter('(filters: { category: { eq: "misky" } })',PRODUCTS);
  products$: Observable<ProductInfo[]> = this.strapiGraphqlService.fetch<ProductInfo[]>(this.params)
    .pipe(
      tap(val => this.loading = val.loading),
      map(d => d.data));


  constructor(
    private strapiGraphqlService: StrapiGraphqlService,
  ) {}

  ngOnDestroy() {
  }
}
