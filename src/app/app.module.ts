import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { ProductComponent } from './product/product.component';
import { BasketComponent } from './basket/basket/basket.component';
import { CarouselComponent } from './carousel/carousel.component';
import { BasketIconComponent } from './basket/basket-icon/basket-icon.component';
import { ContactComponent } from './contact/contact.component';
import { TranspotPaymentComponent } from './transpot-payment/transpot-payment.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ContactFormComponent } from './components/contact-form/contact-form.component';
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
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from "ngx-google-analytics";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { CardsComponent } from './components/cards/cards.component';
import { PageComponent } from './components/page/page.component';
import { BaseComponent } from './components/base/base.component';
import { CardsWithTextComponent } from './components/cards-with-text/cards-with-text.component';
import { BtnComponent } from './components/btn/btn.component';
import { PicAndTextComponent } from './components/pic-and-text/pic-and-text.component';
import { TitleAndPicComponent } from './components/title-and-pic/title-and-pic.component';
import { ProductsComponent } from './components/products/products.component';
import { InfoCardsComponent } from './components/info-cards/info-cards.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { StepsComponent } from "./components/steps/steps.component";
import { TextAndInnerHTMLComponent } from './components/text-and-inner-html/text-and-inner-html.component';
import { EshopMenuComponent } from './components/eshop-menu/eshop-menu.component';
import { OrderMicrogreensComponent } from './components/order-microgreens/order-microgreens.component';
import { registerLocaleData } from "@angular/common";
import localeCs from '@angular/common/locales/cs';
import { FaqComponent } from './components/faq/faq.component';

registerLocaleData(localeCs);

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    ProductComponent,
    BasketComponent,
    CarouselComponent,
    BasketIconComponent,
    ContactComponent,
    TranspotPaymentComponent,
    ContactFormComponent,
    LoadingComponent,
    BasketOverviewComponent,
    BasketPayTransComponent,
    BasketSummaryComponent,
    CardsComponent,
    PageComponent,
    BaseComponent,
    CardsWithTextComponent,
    BtnComponent,
    PicAndTextComponent,
    TitleAndPicComponent,
    ProductsComponent,
    InfoCardsComponent,
    NotFoundComponent,
    StepsComponent,
    TextAndInnerHTMLComponent,
    EshopMenuComponent,
    OrderMicrogreensComponent,
    FaqComponent,
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
