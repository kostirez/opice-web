import { Component } from '@angular/core';
import { MenuItem } from "../menu/menu.component";
import { Router } from "@angular/router";
import { SingleTypesService } from "../apollo/single-types.service";

export type EshopItem = MenuItem & {img: string}

@Component({
  selector: 'app-eshop',
  templateUrl: './eshop.component.html',
  styleUrl: './eshop.component.scss'
})
export class EshopComponent {
  eshopItems: EshopItem[] = [];
  data: any = {};
  loading = true;
  errors: any;

  items: EshopItem[] = []

  // private subscription: Subscription | null=null;

  constructor(
    private singleTypesService: SingleTypesService,
    private router: Router) {}

  ngOnInit() {
    this.singleTypesService.getEshopData()
      .subscribe(result => {
        this.loading = result.loading;
        this.eshopItems = result.data;
        console.log('data', this.items)
      })
  }
  ngOnDestroy() {
    // if(this.queryCategories){
    //   this.queryCategories.unsubscribe();
    // }
  }

  goTo(url: string) {
    this.router.navigate([url]);
    console.log(url)
  }
}
