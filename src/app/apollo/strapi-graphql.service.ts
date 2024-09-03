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

export interface OnDynamic {
  compName: string;
  params: (string | ComponentParams | QueryParams)[];
}

export interface DynamicParams{
  dynamicName: string;
  on: OnDynamic[];
}

export interface ComponentParams {
  compName: string,
  params: (string | QueryParams)[]
}

export interface QueryParams {
  colection: string;
  filter: string;
  items: (string | QueryParams | ComponentParams| DynamicParams)[];
}



export interface StrapiResult<DATA> {
  data: DATA;
  meta?: any
  loading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class StrapiGraphqlService {

  constructor(private apollo: Apollo,) { }

  //////////////////////////////////

  fetch<T>(queryParams: QueryParams, includeMeta: boolean = false): Observable<StrapiResult<T>> {
    const q = this.getSimpleQuery(queryParams, includeMeta)
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
            ...this.mapSimpleResult(
              queryParams, r
            ),
          }
        })
      )
  }

  getSimpleQuery(query: QueryParams, includeMeta: boolean = false): string {
    const meta =`
      meta {
        pagination {
          total
          pageCount
          page
        }
      }`;
    return `
      ${query.colection}${query.filter } {
        data {
          id
          attributes {
            ${this.getQueryItems(query.items)}
          }
        }
        ${includeMeta ? meta : ''}
      }`
  }

  private getQueryItems(items: (string | QueryParams | ComponentParams | DynamicParams)[]):string {
    let ret = '';
    items.forEach(item => {
      if (typeof item === "string") {
        ret += item + ', ';
      } else {
        if("compName" in item && item.compName) {
          ret += item.compName + '{' + this.getQueryItems(item.params) + '}';
        } else {
          if ("dynamicName" in item && item.dynamicName){
            ret += item.dynamicName + '{'
            item.on.forEach(dynamicItem => {
              ret += '... on ' + dynamicItem.compName + '{';
              ret += this.getQueryItems(dynamicItem.params) + '}';
            })
            ret += '}';
          } else {
            ret += this.getSimpleQuery(item as QueryParams)
          }
        }
      }
    });
    return ret;
  }

  mapSimpleResult<T>(query: QueryParams, result: StrapiResult<T>): {data: any, meta: any} {
    return this.mapColection(query, result.data[query.colection])
  }

  mapColection(query: QueryParams, data: any): {data: any, meta: any} {
    const meta = data.meta
    if(Array.isArray(data.data)) {
      const arr = [];
      data.data.forEach(item => {
        arr.push(this.mapResultItems(query.items, item.attributes, item.id))
      })
      return {data: arr, meta}
    } else {
      const d = data.data.attributes;
      return {
        data: this.mapResultItems(query.items, d, data.data.id),
        meta
      }
    }
  }

  mapDynamicZone(on: OnDynamic, data: any) {
    return this.mapResultItems(on.params, data)
  }

  mapResultItems(items: (string | QueryParams | ComponentParams | DynamicParams)[], data: {}, id?: any): any {
    let ret = {id: id};
    items.forEach(item => {
      if (typeof item === "string") {
        ret[item] = data[item]
      } else {
        if ("compName" in item && "params" in item && item.compName) {
          item = item as ComponentParams;
          if (Array.isArray(data[item.compName])) {
            const arr = [];
            for (let d of data[item.compName]) {
              arr.push(this.mapResultItems(item.params, d));
            }
            ret[item.compName]= arr;

          } else {
            ret[item.compName] = this.mapResultItems(item.params, data[item.compName]);
          }
        } else {
          if ("dynamicName" in item && item.dynamicName) {
            item = item as DynamicParams;
            const name = item.dynamicName;
            const dynamicArr = [];
            data[name].forEach((dynamicItem) => {
              const componentDef = (item as DynamicParams).on.find(def => def.compName== dynamicItem.__typename);
              if (componentDef) {
                dynamicArr.push(this.mapDynamicZone(componentDef, dynamicItem))
              }
            })
            ret[item.dynamicName] = dynamicArr;
          } else {
            item = item as QueryParams;
            ret[item.colection] = this.mapColection(item, data[item.colection]).data
          }
        }
      }
    });
    return ret;
  }


}


