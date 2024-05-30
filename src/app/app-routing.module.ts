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
import { BasketComponent } from "./basket/basket/basket.component";
import { InstructionComponent } from "./instruction/instruction.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'eshop', component: EshopComponent,
    children: [
      {path: 'sklenice', component: SkleniceComponent},
      {path: 'misky', component: MiskyComponent},
      {path: 'microgreens', component: MicrogreensComponent}
    ]
  },
  { path: 'kosik', component: BasketComponent,},
  { path: 'navody', component: InstructionComponent,},
  { path: 'pro-restaurace', component: ForRestaurantsComponent},
  { path: 'kontakty', component: ContactComponent},
  { path: 'doprava-a-platba', component: TranspotPaymentComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
