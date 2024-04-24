import { Component } from '@angular/core';
import { ProductInfo } from "../product/product.component";
import { map, Observable, tap } from "rxjs";
import { StrapiGraphqlService } from "../apollo/strapi-graphql.service";
import { addFilter, PRODUCTS } from "../apollo/queries";
import { ActivatedRoute } from "@angular/router";



@Component({
  selector: 'app-sklenice',
  templateUrl: './sklenice.component.html',
})
export class SkleniceComponent {
  productId: string | undefined = undefined;
  productColor: string | undefined = undefined;
  loading = true;
  params = addFilter('(filters: { category: { eq: "sklenice" } })',PRODUCTS);
  products$: Observable<ProductInfo[]> = this.strapiGraphqlService.fetch<ProductInfo[]>(this.params)
    .pipe(
      tap(val => this.loading = val.loading),
      map(d => d.data));


  constructor(
    private strapiGraphqlService: StrapiGraphqlService,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe(params => {
      this.productId = params['id'];
      this.productColor = params['color'];
    });
  }

  scrollToElement(id) {
    const el = document.getElementById('' +id);
    if(el && id == this.productId) {
      el.scrollIntoView({behavior: "smooth"});
    }
  }
}
