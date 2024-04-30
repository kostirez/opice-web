import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import { map, Observable } from "rxjs";
import gql from "graphql-tag";

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

  //////////////////////////////////

  fetch<T>(queryParams: QueryParams): Observable<StrapiResult<T>> {
    const q = this.getSimpleQuery(queryParams)
    const query = gql`
      query Query {
        ${q}
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
          id
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
        arr.push(this.mapResultItems(query.items, item.attributes, item.id))
      })
      return arr
    } else {
      const d = data.data.attributes;
     return this.mapResultItems(query.items, d, data.data.id)
    }
  }

  mapResultItems(items: (string | QueryParams | ComponentParams)[], data: {}, id?: any): any {
    let ret = {id: id};

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


