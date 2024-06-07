import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { EshopComponent, RenderedDirective } from './eshop/eshop.component';
import { HomeComponent } from './home/home.component';
import { SkleniceComponent } from './sklenice/sklenice.component';
import { MiskyComponent } from './misky/misky.component';
import { MicrogreensComponent } from './microgreens/microgreens.component';
import { ProductComponent } from './product/product.component';
import { BasketComponent } from './basket/basket/basket.component';
import { CarouselComponent } from './carousel/carousel.component';
import { BasketIconComponent } from './basket/basket-icon/basket-icon.component';
import { ForRestaurantsComponent } from './for-restaurants/for-restaurants.component';
import { ContactComponent } from './contact/contact.component';
import { TranspotPaymentComponent } from './transpot-payment/transpot-payment.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ContactFormComponent } from './contact-form/contact-form.component';
import { StepsComponent } from './steps/steps.component';
import { HttpClientModule  } from "@angular/common/http";
import { Apollo, APOLLO_OPTIONS } from "apollo-angular";
import { HttpLink } from 'apollo-angular/http';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';
import { URI } from "./apollo/graphql.config";
import { LoadingComponent } from './loading/loading.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BasketOverviewComponent } from './basket/basket-overview/basket-overview.component';
import { BasketPayTransComponent } from './basket/basket-pay-trans/basket-pay-trans.component';
import { BasketSummaryComponent } from './basket/basket-summary/basket-summary.component';
import { InstructionComponent } from './instruction/instruction.component';
import { SeedsComponent } from './seeds/seeds.component';
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from "ngx-google-analytics";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

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
    BasketComponent,
    CarouselComponent,
    BasketIconComponent,
    ForRestaurantsComponent,
    ContactComponent,
    TranspotPaymentComponent,
    ContactFormComponent,
    StepsComponent,
    LoadingComponent,
    BasketOverviewComponent,
    BasketPayTransComponent,
    BasketSummaryComponent,
    InstructionComponent,
    RenderedDirective,
    SeedsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxGoogleAnalyticsModule.forRoot('G-Y1LZCZPKPF'),
    NgxGoogleAnalyticsRouterModule,
  ],
  providers: [
      importProvidersFrom(HttpClientModule),
      provideAnimationsAsync(),
      {
        provide: APOLLO_OPTIONS,
        useFactory: (
          httpLink: HttpLink,
        ): ApolloClientOptions<unknown> => ({
          link: ApolloLink.from([
            httpLink.create({ uri: URI }),
          ]),
          cache: new InMemoryCache(),
        }),
        deps: [HttpLink],
    },
    Apollo,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
