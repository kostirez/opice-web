import { Injectable, Type } from '@angular/core';
import { map, Observable, of } from "rxjs";
import { PAGE, WEB_STRUCTURE } from "./dynamic-queries";
import { QueryParams, StrapiGraphqlService } from "../../apollo/strapi-graphql.service";

export interface ViewComponent {
  type: Type<any>;
  data: any;
}

export interface Page {
  name: string;
  path: string;
  showInMenu: boolean;
  items: any[];
  menuOrder?: number;
}

export interface MenuItem {
  id: string;
  name: string;
  path: string;
  showInMenu: boolean;
  menuOrder: number;
}

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private menuItems$: Observable<MenuItem[]>;

  constructor(private strapiGraphqlService: StrapiGraphqlService) {
    this.menuItems$ = this.strapiGraphqlService.fetch<MenuItem[]>(WEB_STRUCTURE)
      .pipe(
        map(resp => resp.data),
      )
  }

  getMenu$(): Observable<MenuItem[]>{
    return this.menuItems$;
  }

  getPage$(id: string): Observable<Page> {
    if(id==='-404') {
      return of({
        name: 'not found',
        path: '/404',
        showInMenu: false,
        items: [{__typename: 'not-found'}],
      })
    }
    const pageQuery = {...PAGE, filter: `(id: ${id})`} as QueryParams;
    return this.strapiGraphqlService.fetch<Page>(pageQuery)
      .pipe(
        map(resp => resp.data)
      );
  }
}
