import { Component } from '@angular/core';
import { StrapiApiService } from "../strapi-api.service";
import { Validators } from "@angular/forms";
import { FormBuilder } from '@angular/forms';
import { catchError, Observable, throwError } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

export interface Message {
  mail: string;
  name: string;
  text: string;
}

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  sent = false;
  loading = false;
  sentMessage = 'Dotaz byl odeslán';
  messageForm =  this.formBuilder.group({
    mail: [ '', [Validators.required,  Validators.email] ],
    name: [ '', Validators.required ],
    text: [ '', Validators.required ],
  });

  constructor(
    private strapiApi: StrapiApiService,
    private formBuilder: FormBuilder
) {}

  onSubmit() {
    this.send({
      mail: this.messageForm.value.mail,
      name: this.messageForm.value.name,
      text: this.messageForm.value.text
    });
  }

  send(message: Message) {
    this.messageForm.markAllAsTouched();

    if (!this.messageForm.valid) {
      return;
    }
    this.loading = true;
    this.strapiApi.sendMessage(message)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe((response) => {
        console.log(response);
        this.sent = true;
        this.loading = false;
      });
  }

  private handleError(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    this.sentMessage = 'Omlouváme se, něco se pokazilo. Pošlete nám prosím dotaz přes e-mail';
    this.sent = true;
    this.loading = false;
    return throwError(error);
  }
}
