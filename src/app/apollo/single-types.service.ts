import { Injectable } from '@angular/core';
import { StrapiGraphqlService, StrapiResult } from "./strapi-graphql.service";
import { Observable } from "rxjs";
import { ESHOP_MAIN, GROW, HOME, INSTRUCTIONS, OFFERS, PAYMENT, RESTAURANT, TRANSPORT } from "./queries";


@Injectable({
  providedIn: 'root'
})
export class SingleTypesService {

  constructor(private strapiGraphqlService: StrapiGraphqlService) { }

  getHomeData<T>(): Observable<StrapiResult<T>>{
    return this.strapiGraphqlService.fetch<T>(HOME)
  }

  getEshopData<T>(): Observable<StrapiResult<T>>{
    return this.strapiGraphqlService.fetch<T>(ESHOP_MAIN)
  }

  getRestaurantData<T>(): Observable<StrapiResult<T>>{
    return this.strapiGraphqlService.fetch<T>(RESTAURANT)
  }

  getRestaurantOfferData<T>(): Observable<StrapiResult<T>>{
    return this.strapiGraphqlService.fetch<T>(OFFERS)
  }

  getGrowOptionData<T>(): Observable<StrapiResult<T>>{
    return this.strapiGraphqlService.fetch<T>(GROW)
  }

  getPaymentData<T>(): Observable<StrapiResult<T>>{
    return this.strapiGraphqlService.fetch<T>(PAYMENT)
  }

  getTransportData<T>(): Observable<StrapiResult<T>>{
    return this.strapiGraphqlService.fetch<T>(TRANSPORT)
  }

  getInstructionData<T>(): Observable<StrapiResult<T>>{
    return this.strapiGraphqlService.fetch<T>(INSTRUCTIONS)
  }
}
