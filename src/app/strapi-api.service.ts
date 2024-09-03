import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Message } from "./components/contact-form/contact-form.component";
import { Order, OrderResponse } from "./basket/basket.service";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";



@Injectable({
  providedIn: 'root'
})
export class StrapiApiService {

  headers = new HttpHeaders();


  constructor(private http: HttpClient) {
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');

  }


  sendOrder(order: Order): Observable<{orderResponse: OrderResponse, image: string}> {
    return this.http
      .post<{orderResponse: OrderResponse, image: string}>(
        environment.apiUrl + "/orders",
        {data: order},
        {headers: this.headers}
      );
  }

  sendMessage(message: Message) {
    return this.http
      .post(
        environment.apiUrl + "/messages",
        {data: message},
        {headers: this.headers}
      );
  }
}
