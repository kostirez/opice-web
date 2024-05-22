import { Component } from '@angular/core';
import { addFilter, PRODUCTS } from "../apollo/queries";
import { map, Observable, tap } from "rxjs";
import { ProductInfo } from "../product/product.component";
import { StrapiGraphqlService } from "../apollo/strapi-graphql.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-seeds',
  templateUrl: './seeds.component.html',
})
export class SeedsComponent {
  productId: string | undefined = undefined;
  productColor: string | undefined = undefined;
  loading = true;
  params = addFilter('(filters: { category: { eq: "seminka" } })',PRODUCTS);
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
