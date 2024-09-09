import { Component, Inject, Input } from '@angular/core';
import { StrapiApiService } from "../../strapi-api.service";
import { Validators } from "@angular/forms";
import { FormBuilder } from '@angular/forms';
import { catchError, Observable, throwError } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { BaseComponent } from "../base/base.component";
import { DOCUMENT } from "@angular/common";

export interface Message {
  mail: string;
  name: string;
  text: string;
}

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent extends BaseComponent{
  @Input() override data: {
    head: string, // Kontaktujte nás
    showMail: boolean,
    showSoc: boolean,
  }
  sent = false;
  loading = false;
  sentMessage = 'Dotaz byl odeslán';
  messageForm =  this.formBuilder.group({
    mail: [ '', [Validators.required,  Validators.email] ],
    name: [ '', Validators.required ],
    text: [ '', Validators.required ],
  });

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private strapiApi: StrapiApiService,
    private formBuilder: FormBuilder
) {
    super();}

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
      .subscribe((_) => {
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

  goTo(link: string): void {
    this.document.location.href = link;
  }
}
