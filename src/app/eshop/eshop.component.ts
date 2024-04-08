import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { SingleTypesService } from "../apollo/single-types.service";
import { MenuPicItem } from "../model/view";
import { Subscription } from "rxjs";
import { ImageService } from "../image.service";
import { transition, trigger, useAnimation } from "@angular/animations";
import { fadeIn, fadeOut } from "../carousel/carousel.animation";

export interface EshopData {
  items: MenuPicItem[];
  head: string
}

@Component({
  selector: 'app-eshop',
  templateUrl: './eshop.component.html',
  styleUrl: './eshop.component.scss',
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

  items: MenuPicItem[] = []

  private subscription: Subscription | null=null;

  constructor(
    private singleTypesService: SingleTypesService,
    private router: Router,
    private imageService: ImageService,
    ) {}

  ngOnInit() {
    this.actualUrl = this.router.url;

    this.subscription = this.singleTypesService.getEshopData<EshopData>()
      .subscribe(result => {
        this.loading = result.loading;
        this.eshopItems = result.data.items;
      })
  }
  ngOnDestroy() {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
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
