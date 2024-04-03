import { Injectable } from '@angular/core';
import { StrapiGraphqlService, StrapiResult } from "./strapi-graphql.service";
import { Observable } from "rxjs";
import { EshopItem } from "../eshop/eshop.component";

const IMAGE_URL = `
    data {
      attributes {
        url
      }
    }
  `

@Injectable({
  providedIn: 'root'
})
export class SingleTypesService {

  constructor(private strapiGraphqlService: StrapiGraphqlService) { }

  getRestaurantData(): Observable<any>{
    return this.strapiGraphqlService.getData(
      'forRestaurant',
      `
      head,
      description,
      head_2,
      description_2,
      main_img {${IMAGE_URL}},
      how_it_works {${IMAGE_URL}},
      meals {${IMAGE_URL}}
      `,
      ['main_img', 'how_it_works'],
      ['meals']
    );
  }

  getHomeData(): Observable<any>{
    return this.strapiGraphqlService.getData(
      'home',
      `
      title,
      description,
      main_pic {${IMAGE_URL}},
      microgreens_use {${IMAGE_URL}},
      `,
      ['main_pic'],
      ['microgreens_use']
    );
  }

  getEshopData(): Observable<StrapiResult<EshopItem[]>>{
    return this.strapiGraphqlService.getData<EshopItem[]>(
      'eshop',
      `
      name,
      url,
      img {${IMAGE_URL}},
      `,
      ['img'],
      [],
      'categories',
    );
  }
}
