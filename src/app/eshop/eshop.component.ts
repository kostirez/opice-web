import { Component } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { SingleTypesService } from "../apollo/single-types.service";
import { MenuPicItem } from "../model/view";
import { Subscription } from "rxjs";
import { ImageService } from "../image.service";
import { transition, trigger, useAnimation } from "@angular/animations";
import { fadeIn, fadeOut } from "../carousel/carousel.animation";

export interface EshopData {
  items: MenuPicItem[];
  head: string;
  promotion: string;
}

@Component({
  selector: 'app-eshop',
  templateUrl: './eshop.component.html',
  animations: [
    trigger("fadeAnimation", [
      transition("void => *", [useAnimation(fadeIn, {params: { time: '1500ms' }} )]),
      transition("* => void", [useAnimation(fadeOut, {params: { time: '1500ms' }})]),
    ])
  ]
})
export class EshopComponent {
  eshopItems: MenuPicItem[] = [];
  data: any = {};
  loading = true;
  errors: any;
  actualUrl = 'eshop';
  productsOpen = false;
  promotion = '';

  items: MenuPicItem[] = []

  private subscription: Subscription[] = [];

  constructor(
    private singleTypesService: SingleTypesService,
    private router: Router,
    private imageService: ImageService,
    ) {}

  ngOnInit() {
    this.actualUrl = this.router.url;
    if (this.actualUrl === '/eshop/sklenice' || this.actualUrl === '/eshop/misky') {
      this.productsOpen = true;
    }
    this.subscription.push(this.singleTypesService.getEshopData<EshopData>()
      .subscribe(result => {
        this.loading = result.loading;
        this.eshopItems = result.data.items;
        this.promotion = result.data.promotion
      }));
    this.subscription.push(this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.productsOpen = event.url!=='/eshop'
        }
      }));
  }
  ngOnDestroy() {
    this.subscription.forEach(s => s.unsubscribe());
  }

  goTo(url: string) {
    this.router.navigate([url]);
    this.actualUrl = url;
    if(this.actualUrl !== 'eshop') {
      this.productsOpen = true;
    }
  }

  getBase(): string {
    return this.imageService.getImageBase();
  }
}
