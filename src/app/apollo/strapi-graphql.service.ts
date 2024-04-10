import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import { map, Observable } from "rxjs";
import { ApolloQueryResult, DocumentNode } from "@apollo/client/core";
import gql from "graphql-tag";
import { environment } from "../../environments/environment";

interface SingleDataStructure {
  [key: string]: {
    data: {
      attributes: any
    }
  };
}

export interface ComponentParams {
  compName: string,
  params: (string | QueryParams)[]
}

export interface QueryParams {
  colection: string;
  filtr: string;
  items: (string | QueryParams | ComponentParams)[];
}



export interface StrapiResult<DATA> {
  data: DATA;
  loading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class StrapiGraphqlService {

  constructor(private apollo: Apollo,) { }

  private createQuery(
    colection: string,
    attributes: string,
    component?: string,
    filter: string = '',
  ): DocumentNode {
    return gql`
      query Query {
        ${colection}${filter} {
          data {
            attributes {
              ${component? component + ' {': ''}
              ${attributes}
              ${component? '}' : ''}
            }
          }
        }
      }`;
  }

  private mapResult<DATA>(
    data: ApolloQueryResult<SingleDataStructure>,
    colection: string,
    singleImages: string[] = [],
    multipleImages: string[] = [],
    component?: string,
  ): StrapiResult<DATA> {
    let result = {
      data: component ?
        this.getComponentData(data.data[colection].data.attributes, component):
        Object.assign({}, data.data[colection].data.attributes),
      loading: data.loading,
    };

    if (singleImages.length !== 0) {
      singleImages.forEach(image => {
        if (component) {
          for (let item of result.data) {
            item[image] = environment.url + this.getImageUrl(item[image])
          }
        } else {
          result.data[`${image}`] = environment.url +this.getImageUrl(result.data[image])
        }
      })
    }
    if (multipleImages.length !== 0) {
      multipleImages.forEach(images => {
        const array:string[] = [];
        result.data[`${images}`].data.forEach((image: any) => {
          array.push(environment.url + image.attributes.url)
        });
        result.data[`${images}`] = array;
      });
    }
    return result;
  }

  private getImageUrl(data: any): string {
    return data.data.attributes.url;
  }

  getSingleData<DATA>(
    colection: string,
    attributes: string,
    singleImages: string[] = [],
    multipleImages: string[] = [],
    component?: string,
    filter?: string,
    ): Observable<StrapiResult<DATA>> {
    return this.apollo.watchQuery<SingleDataStructure>(
      {
        query: this.createQuery(
          colection,
          attributes,
          component,
          filter,
        )
      }
    ).valueChanges
      .pipe(
        map(data=> {
          return this.mapResult<DATA>(
            data,
            colection,
            singleImages,
            multipleImages,
            component,
          )
        })
      )
  }

  private getComponentData(attributes: any, component: string) {
    const result = [];
    for (let item of attributes[component]) {
      result.push(Object.assign({}, item))
    }
    return result
  }

  //////////////////////////////////

  fetch<T>(queryParams: QueryParams): Observable<StrapiResult<T>> {
    const a = this.getSimpleQuery(queryParams)
    const query = gql`
      query Query {
        ${a}
      }`;
    return this.apollo.watchQuery<SingleDataStructure>(
      {query}
    ).valueChanges
      .pipe(
        map(r =>{
          return {
            ...r,
            data: this.mapSimpleResult(
              queryParams, r
            )
          }
        })
      )
  }

  getSimpleQuery(query: QueryParams): string {
    return `
      ${query.colection}${query.filtr } {
        data {
          attributes {
            ${this.getQueryItems(query.items)}
          }
        }
      }`
  }

  private getQueryItems(items: (string | QueryParams | ComponentParams)[]):string {
    let ret = '';
    items.forEach(item => {
      if (typeof item === "string") {
        ret += item + ', ';
      } else {
        if("compName" in item && item.compName) {
          ret += item.compName + '{' + this.getQueryItems(item.params) + '}';
        } else {
          ret += this.getSimpleQuery(item as QueryParams)
        }
      }
    });
    return ret;
  }

  mapSimpleResult<T>(query: QueryParams, result: StrapiResult<T>): any {
    return this.mapColection(query, result.data[query.colection])
  }

  mapColection(query: QueryParams, data: any): any {
    if(Array.isArray(data.data)) {
      const arr = [];
      data.data.forEach(item => {
        arr.push(this.mapResultItems(query.items, item.attributes))
      })
      return arr
    } else {
      const d = data.data.attributes
      return this.mapResultItems(query.items, d)
    }
  }

  mapResultItems(items: (string | QueryParams | ComponentParams)[], data: {}): any {
    let ret = {};
    items.forEach(item => {
      if (typeof item === "string") {
        ret[item] = data[item]
      } else {
        if ("compName" in item && "params" in item && item.compName) {
          const arr = [];
          item = item as ComponentParams;
          for (let d of data[item.compName]) {
            arr.push(this.mapResultItems(item.params, d))
          }
          ret[item.compName]= arr;
        } else {
          item = item as QueryParams;
          ret[item.colection] = this.mapColection(item, data[item.colection])
        }
      }
    });
    return ret;
  }


}


