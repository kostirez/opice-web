import { Component,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BaseComponent } from "../base/base.component";
import { MICROGREENS_BOX } from "../../apollo/queries";
import { StrapiGraphqlService } from "../../apollo/strapi-graphql.service";
import { Picture } from "../../model/view";
import { ImageService } from "../../image.service";
import {
  Customer,
  MicrogreensOrderResponse,
  MicrogreensOrderService,
  MicrogreensPorduct
} from "./microgreens-order.service";

interface MicrogreensBox {
  id: string;
  name: string;
  growDuration: number;
  price: number;
  pic: Picture;
  description: string;
  count: number;
  availableBoxes: {
    sinceWhen: string,
    count: number,
  }[];
}

interface PaymentMethod {
  text: string;
  value: string
}

@Component({
  selector: 'app-order-microgreens',
  templateUrl: './order-microgreens.component.html',
})
export class OrderMicrogreensComponent extends BaseComponent {
  @Input() override data: {
    head: string,
    text: string,
  }

  microgreensBoxes: MicrogreensBox[] = [];
  personForm: FormGroup;
  paymentMethods = [{text: 'Hotově', value: 'cash'}, {text: 'Převodem', value: 'transfer'}];
  loading = false;
  orderResponse: MicrogreensOrderResponse = undefined;
  selectedDate: Date | undefined = undefined;
  selectedPayment: PaymentMethod | undefined = undefined;

  steps = [
    {head: 'Výběr krabičky', index: 0},
    {head: 'Datum vyzvednutí', index: 1},
    {head: 'Osobní údaje', index: 2},
    {head: 'Souhrn objednávky', index: 3},
  ]

  errorMessage = '';
  orderError = ''

  step=0

  pickUpDates: Date[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private strapiGraphqlService: StrapiGraphqlService,
    private imageService: ImageService,
    private formBuilder: FormBuilder,
    private microgreensService: MicrogreensOrderService,
  ) {
    super();
    // Iniciace formuláře
    this.personForm = this.formBuilder.group({
      email: [ '', [Validators.required,  Validators.email]],
      name: [ '', [Validators.required, Validators.pattern("[a-zA-ZÀ-ž ]*")]],
      tel: [ '', [Validators.required, Validators.pattern("^[0-9 ]*$"),
        Validators.minLength(8), Validators.maxLength(12)]],
    });
    this.loadMicrogreensBoxes();

  }

  loadMicrogreensBoxes(): void {
    this.strapiGraphqlService.fetch<MicrogreensBox[]>(MICROGREENS_BOX)
      .subscribe(data => {
        this.microgreensBoxes = data.data;
        this.microgreensBoxes.map(box => box.availableBoxes = [
          ...box.availableBoxes,
          ...this.generateNextAvailability(box),
          ]
        );
        this.microgreensBoxes.map(b => b.count=0)
      }, error => {
        console.error('Failed to load microgreens boxes:', error);
      });
  }

  // Odeslání objednávky
  submitOrder(): void {
    const order = {
      customer: this.personForm.value as Customer,
      payment: this.selectedPayment.value,
      palce: 'veletrzni',
      products: this.microgreensBoxes.map(box => ({
        boxId: box.id,
        count: box.count
      }) as MicrogreensPorduct),
      pickUpDate: this.selectedDate
    }
    this.step = 4;
    this.loading = true;
    this.microgreensService.sendOrder(order)
      .subscribe({
        next: (response) => {
          this.orderResponse = response.orderResponse;
          this.step=4;
          this.loading = false;

        },
        error: (error) => {
          if (error.status===406) {
            this.orderError = 'Vybrané krabičky již nejsou dostupne, je možné, že Vás někdo předběhl během objednávání. Můžete zkusit změnit čas dodání.';
          } else {
            this.orderError = 'Něco se pokazilo a objednávku se nepovedlo odeslat.';
          }
          this.step=5;
          this.loading = false;
        },
      });
  }

  getBase(): string {
    return this.imageService.getImageBase();
  }

  backToStart() {
    this.goToStep(0);
    this.selectedDate = undefined;
  }

  changeBoxCount(step: number, box: MicrogreensBox) {
    const result = box.count + step;
    if (result > -1 && result < 6) {
      box.count = result;
      this.errorMessage = '';
    }
  }

  private initPickUpDates() {
    this.pickUpDates = [];
    const selectedBoxes: MicrogreensBox[] = [];
    this.microgreensBoxes.forEach(box=> {
      if (box.count!=0){
        selectedBoxes.push({
          ...box,
          availableBoxes: [...box.availableBoxes]
            .filter(b => b.count>=box.count)
        })
      }
    })

    this.getNextDay([1,4],7)
      .forEach(day => {
        for(let box of selectedBoxes) {
          if(!box.availableBoxes.some(b => (new Date(b.sinceWhen)).toDateString()===day.toDateString())){
            return
          }
        }
        this.pickUpDates.push(day);
      })
  }

  isDayAvailable(day: Date): boolean {
    const allDates = this.microgreensBoxes
      .filter(box => box.count !=0)
      .flatMap(box =>
      box.availableBoxes
    );
    return allDates.some(d => (new Date(d.sinceWhen)).toDateString()===day.toDateString())
  }

  getNextDay(targetDays: number[], count: number, startDate = new Date()): Date[] {
    const result = [];
    startDate.setDate(startDate.getDate() -1);
    while (result.length < count) {
      startDate.setDate(startDate.getDate() + 1);
      const dayOfWeek = startDate.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6

      if (targetDays.includes(dayOfWeek)) {
        result.push(new Date(startDate)); // Push a copy of the date
      }
    }
    return result;
  }

  selectDate(selectedDate: Date) {
    this.selectedDate = new Date(selectedDate);
    this.errorMessage = '';
  }

  selectPayment(method: PaymentMethod) {
    this.selectedPayment = method;
    this.errorMessage = '';
  }

  private generateNextAvailability(box: MicrogreensBox)  {
    const today = new Date();
    const earliestDateToBeGrown = new Date();
    earliestDateToBeGrown.setDate(today.getDate() + box.growDuration);
    return this.getNextDay([1,4],3, earliestDateToBeGrown)
      .map(day => ({
        sinceWhen: day.toDateString(),
        count: 10,
      }));
  }

  nextStep() {
    if(this.step<3){
      this.goToStep(this.step+1)
    }
  }

  previousStep() {
    if (this.step>0) {
      this.goToStep(this.step-1)
    }
  }

  goToStep(step: number, withError: boolean = false) {
    if(!withError){
      this.errorMessage = '';
    }
    switch (step) {
      case 0:
        this.step=0;
        break;
      case 1:
        if (this.microgreensBoxes.some(m => m.count>0)){
          this.initPickUpDates();
          this.step = 1;
        } else {
          this.errorMessage = 'Vyberte si alespoň jednu krabičku pomocí tlaíčtka +';
          this.goToStep(0, true);
        }
        break;
      case 2:
        if(this.selectedDate) {
          this.step = 2;
        }
        else {
          this.errorMessage = 'Vyberte datum vyzvednutí.';
          this.goToStep(1, true);
        }
        break;
      case 3:
        if(this.selectedPayment && this.personForm.valid) {
          this.step = 3;
        }else {
          this.errorMessage = 'Vyberte platbu a zadejte kontaktní údaje.';
          this.goToStep(2, true);
          this.personForm.markAllAsTouched();
        }
        break;
      default:
        this.goToStep(0);
    }
  }

  getTotalPrice() {
    let total=0;
    this.microgreensBoxes.forEach(box => {
      total+=(box.price*box.count);
    });
    return total;
  }
}
