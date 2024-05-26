import { Component, OnInit } from '@angular/core';
import { map, Observable, tap } from "rxjs";
import { ProductInfo } from "../product/product.component";
import { StrapiGraphqlService } from "../apollo/strapi-graphql.service";
import { addFilter, PRODUCTS } from "../apollo/queries";
import { ActivatedRoute } from "@angular/router";
import { Meta, Title } from "@angular/platform-browser";
import { META_DATA } from "../meta/metadata";

@Component({
  selector: 'app-misky',
  templateUrl: './misky.component.html',
})
export class MiskyComponent implements OnInit{
  productId: string | undefined = undefined;
  productColor: string | undefined = undefined;
  loading = true;
  params = addFilter('(filters: { category: { eq: "misky" } })',PRODUCTS);
  products$: Observable<ProductInfo[]> = this.strapiGraphqlService.fetch<ProductInfo[]>(this.params)
    .pipe(
      tap(val => this.loading = val.loading),
      map(d => d.data));


  constructor(
    private strapiGraphqlService: StrapiGraphqlService,
    private route: ActivatedRoute,
    private titleService: Title,
    private metaTagService: Meta,
  ) {
    this.route.queryParams.subscribe(params => {
      this.productId = params['id'];
      this.productColor = params['color'];
    });
  }

  ngOnInit() {
    // metadata
    this.titleService.setTitle(META_DATA['misky'].title);
    this.metaTagService.addTags(META_DATA['misky'].tags);
  }

  scrollToElement(id) {
    const el = document.getElementById('' +id);
    if(el && id == this.productId) {
      el.scrollIntoView({behavior: "smooth"});
    }
  }
}
