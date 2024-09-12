import { Injectable } from "@angular/core";
import {  StrapiApiService } from "../../strapi-api.service";
import { Observable } from "rxjs";

export interface Customer {
  name: string;
  email: string;
  tel: number;
};

export interface MicrogreensOrder {
  customer: Customer;
  payment: string;
  palce: string;
  products: MicrogreensPorduct[]
  pickUpDate: Date;
}

export interface MicrogreensOrderResponse {
  id: string;
  payment: string;
  place: string;
  pickUpDate: string;
}

export interface MicrogreensPorduct {
  boxId: string;
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class MicrogreensOrderService {

  constructor(
    private strapiApiService: StrapiApiService
  ) {
  }

  sendOrder(
    order: MicrogreensOrder
  ): Observable<{ orderResponse: MicrogreensOrderResponse; image: string }> {
    return this.strapiApiService.sendMicrogreensOrder(order)
  }
}
