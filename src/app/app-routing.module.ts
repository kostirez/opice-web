import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from "./contact/contact.component";
import { BasketComponent } from "./basket/basket/basket.component";
import { PageComponent } from "./components/page/page.component";
import { TranspotPaymentComponent } from "./transpot-payment/transpot-payment.component";

const routes: Routes = [
  { path: 'kosik', component: BasketComponent,},
  { path: 'kontakty', component: ContactComponent},
  { path: 'doprava-a-platba', component: TranspotPaymentComponent},
  { path: '**', component: PageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
