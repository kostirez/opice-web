import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { addFilter, PRODUCTS } from "../../apollo/queries";
import { map, Observable, tap } from "rxjs";
import { ProductInfo } from "../../product/product.component";
import { StrapiGraphqlService } from "../../apollo/strapi-graphql.service";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "../base/base.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent extends BaseComponent implements OnInit{
  @Input() override data: {
    category: string,
    head: string,
    pageSize: number,
  };

  @ViewChild('topTitle')  topTitle: ElementRef | undefined;

  products$: Observable<ProductInfo[]>;
  productId: string | undefined = undefined;
  productColor: string | undefined = undefined;
  loading = true;
  selectedPage = 0;
  pageCount = 1;
  pages: number[] = [];

  constructor(
    private strapiGraphqlService: StrapiGraphqlService,
    private route: ActivatedRoute,
  ) {
    super()
    this.route.queryParams.subscribe(params => {
      this.productId = params['id'];
      this.productColor = params['color'];
    });
  }

  override ngOnInit() {
    super.ngOnInit();
    this.goToPage(1);
  }

  scrollToElement(id) {
    const el = document.getElementById('' +id);
    if(el && id == this.productId) {
      el.scrollIntoView({behavior: "smooth"});
    }
  }

  fetchProducts(): void {
    const params = addFilter(`(filters: { category: { eq: "${this.data.category}"}},pagination: { page: ${this.selectedPage}, pageSize: ${this.data.pageSize} })`,PRODUCTS);
    this.products$ = this.strapiGraphqlService.fetch<ProductInfo[]>(params, true)
      .pipe(
        tap(val => this.loading = val.loading),
        tap(val => this.setMetadata(val.meta.pagination)),
        map(d => d.data));
  }

  scrollToTop() {
    if(this.topTitle){
      this.topTitle.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  movePage(step): void {
    const page = step + this.selectedPage;
    if(this.pages.includes(page)) {
      this.goToPage(page);
    }
  }

  goToPage(pageIndex: number): void {
    if (pageIndex != this.selectedPage) {
      this.selectedPage = pageIndex;
      this.scrollToTop();
      this.fetchProducts();
    }
  }

  setMetadata(pagination: {pageCount: number}) {
    this.pageCount = pagination.pageCount
    this.pages = [...Array(this.pageCount).keys()].map(p => p+1)
  }
}
