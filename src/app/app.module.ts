import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { EshopComponent } from './eshop/eshop.component';
import { HomeComponent } from './home/home.component';
import { SkleniceComponent } from './sklenice/sklenice.component';
import { MiskyComponent } from './misky/misky.component';
import { MicrogreensComponent } from './microgreens/microgreens.component';
import { ProductComponent } from './product/product.component';
import { ProductCategoryNavComponent } from './product-category-nav/product-category-nav.component';
import { BasketComponent } from './basket/basket.component';
import { CarouselComponent } from './carousel/carousel.component';
import { BasketIconComponent } from './basket-icon/basket-icon.component';
import { ForRestaurantsComponent } from './for-restaurants/for-restaurants.component';
import { ContactComponent } from './contact/contact.component';
import { TranspotPaymentComponent } from './transpot-payment/transpot-payment.component';
import { DocumentsComponent } from './documents/documents.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ContactFormComponent } from './contact-form/contact-form.component';
import { StepsComponent } from './steps/steps.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    EshopComponent,
    HomeComponent,
    SkleniceComponent,
    MiskyComponent,
    MicrogreensComponent,
    ProductComponent,
    ProductCategoryNavComponent,
    BasketComponent,
    CarouselComponent,
    BasketIconComponent,
    ForRestaurantsComponent,
    ContactComponent,
    TranspotPaymentComponent,
    DocumentsComponent,
    ContactFormComponent,
    StepsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
