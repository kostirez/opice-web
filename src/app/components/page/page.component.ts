import { ActivatedRoute } from "@angular/router";
import { AfterViewInit, Component, OnDestroy, ViewChild, ViewContainerRef } from "@angular/core";
import { combineLatest, mergeMap, map, tap } from "rxjs";
import { MetaData, Page, PageService, ViewComponent } from "../services/page.service";
import { ComponentService } from "../services/component.service";
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
})
export class PageComponent implements OnDestroy, AfterViewInit {
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef  | undefined;

  currentPageId: string = '';
  pageNotFound = false;


  constructor(
    private pageService: PageService,
    private route: ActivatedRoute,
    private componentService: ComponentService,
    private titleService: Title,
    private metaTagService: Meta,
  ) {
  }

  create(components: ViewComponent[]) {
    this.clean();
    components.forEach(c => {
      const ref = this.container.createComponent(c.type);
      ref.setInput('data', c.data);
    })

  }

  clean() {
    if (this.container) {
      this.container.clear()
    }
  }

  initMeta(metaData: MetaData) {
    this.titleService.setTitle(metaData.title);
    this.metaTagService.addTags(metaData.tags);
  }

  ngOnDestroy(): void {
    this.clean();
  }

  ngAfterViewInit(): void {
    combineLatest([
      this.route.url.pipe(map((segments) => segments.join('/'))),
      this.pageService.getMenu$()
    ]).pipe(
      tap((result) => {
        const currentPath = result[0] as string;
        const found = result[1]
          .filter(item => item.path === currentPath);
        if (found && found[0] && found[0].id) {
          this.currentPageId = found[0].id
        } else {
          if(currentPath === ''){
            this.currentPageId = '1';
          } else {
            this.currentPageId = '-404';
          }
        }
      }),
      mergeMap(() => this.pageService.getPage$(this.currentPageId)),
      tap((page: Page) => {
        const components = this.componentService.mapComponents(page.items);
        this.create(components)
        this.initMeta(page.metaData)
      })
    ).subscribe()
  }
}
