import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Message } from "./contact-form/contact-form.component";
import { Order } from "./basket/basket.service";
import { Observable } from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class StrapiApiService {

  headers = new HttpHeaders();


  constructor(private http: HttpClient) {
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');

  }


  sendOrder(order: Order): Observable<{data: {attributes: Order}}> {
    return this.http
      .post<{data: {attributes: Order}}>(
        "http://localhost:1337/api/orders",
        {data: order},
        {headers: this.headers}
      );
  }

  sendMessage(message: Message) {
    return this.http
      .post(
        "http://localhost:1337/api/messages",
        {data: message},
        {headers: this.headers}
      );
  }
}
