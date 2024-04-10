import { Component } from '@angular/core';
import { map, Observable } from "rxjs";
import { TextItem } from "../model/view";
import { SingleTypesService } from "../apollo/single-types.service";

@Component({
  selector: 'app-transpot-payment',
  templateUrl: './transpot-payment.component.html',
})
export class TranspotPaymentComponent {

  payment$: Observable<TextItem[]> =
    this.singleTypesService.getPaymentData<{paymentMethods: TextItem[]}>()
      .pipe(
        map(d => d.data.paymentMethods));


  transport$: Observable<TextItem[]> =
    this.singleTypesService.getTransportData<{transportMethods: TextItem[]}>()
      .pipe(
        map(d => d.data.transportMethods));

  constructor(
    private singleTypesService: SingleTypesService,
  ) {}
}
