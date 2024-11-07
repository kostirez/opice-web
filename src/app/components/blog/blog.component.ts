import { Component, Inject, Input } from '@angular/core';
import { BaseComponent } from "../base/base.component";
import { DOCUMENT } from "@angular/common";
import { ImageService } from "../../image.service";
import { ActivatedRoute, Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { Article } from "../dynamic-article/dynamic-article.component";
import { StrapiGraphqlService } from "../../apollo/strapi-graphql.service";
import { addFilter, ARTICLE } from "../../apollo/queries";

export interface ArticlePreview {
  id: string;
  name: string;
  urlParam: string;
  mainImage: string;
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
})
export class BlogComponent extends BaseComponent {
  @Input() override data: {
    head: string,
    text: string,
    articles: ArticlePreview[]
  };

  mode: 'menu' | 'article';
  article$: Observable<Article>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private imageService: ImageService,
    private router: Router,
    private route: ActivatedRoute,
    private strapiGraphqlService: StrapiGraphqlService,
  ) {
    super();
    this.mode = 'menu';
  }


  override ngOnInit() {
    this.route.queryParams.subscribe(params => {

      if (params['article']) {
        this.mode = 'article';
        const query = addFilter(`(filters: { id: { eq: "${params['article']}"}})`,ARTICLE);
        this.article$ = this.strapiGraphqlService.fetch<Article>(query)
          .pipe(
            map(d => d.data[0]),
            map(d => {
              d.slides.map(s => {
                if (s.content && s.content.includes('\n')){
                  s.content = s.content.split('\n');
                }
                return s;
              })
              return d;
            }),
          );
      } else {
        this.mode = 'menu';
      }
    });
  }

  goToArticle(articleId: string): void {
    if(!articleId){
      return;
    }
    this.router.navigate(['/blog'], { queryParams: { article: articleId}});
  }

  backToMenu(): void {
    this.mode = 'menu';
    this.router.navigate(['/blog']);
  }

  getBase(): string {
    return this.imageService.getImageBase();
  }
}
