import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { EshopComponent } from "./eshop/eshop.component";
import { SkleniceComponent } from "./sklenice/sklenice.component";
import { MiskyComponent } from "./misky/misky.component";
import { MicrogreensComponent } from "./microgreens/microgreens.component";
import { ForRestaurantsComponent } from "./for-restaurants/for-restaurants.component";
import { ContactComponent } from "./contact/contact.component";
import { TranspotPaymentComponent } from "./transpot-payment/transpot-payment.component";
import { DocumentsComponent } from "./documents/documents.component";
import { BasketComponent } from "./basket/basket/basket.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'eshop', component: EshopComponent,
    children: [
      {path: 'sklenice', component: SkleniceComponent},
      {path: 'misky', component: MiskyComponent},
      {path: 'microgreens', component: MicrogreensComponent}
    ]
  },
  { path: 'kosik', component: BasketComponent,},
  { path: 'pro-restaurace', component: ForRestaurantsComponent},
  { path: 'kontakty', component: ContactComponent},
  { path: 'doprava-a-platba', component: TranspotPaymentComponent},
  { path: 'dokumenty', component: DocumentsComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
