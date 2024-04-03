import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import { map, Observable } from "rxjs";
import { ApolloQueryResult, DocumentNode } from "@apollo/client/core";
import gql from "graphql-tag";
import { environment } from "../../enviroments/enviroment";

interface DataStructure {
  [key: string]: {
    data: {
      attributes: any
    }
  };
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
  ): DocumentNode {
    return gql`
      query Query {
        ${colection} {
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
    data: ApolloQueryResult<DataStructure>,
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
    console.log('images', data)
    return data.data.attributes.url;
  }

  getData<DATA>(
    colection: string,
    attributes: string,
    singleImages: string[] = [],
    multipleImages: string[] = [],
    component?: string,
    ): Observable<StrapiResult<DATA>> {
    return this.apollo.watchQuery<DataStructure>(
      {
        query: this.createQuery(
          colection,
          attributes,
          component
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
}
