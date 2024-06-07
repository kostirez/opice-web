import { Component, Inject } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { SingleTypesService } from "../apollo/single-types.service";
import { map, Observable, of, tap } from "rxjs";
import { PicArray, Picture, TextItem } from "../model/view";
import { ImageService } from "../image.service";
import { Router } from "@angular/router";
import { animate, style, transition, trigger } from "@angular/animations";

export type HomeData = {
  head: string;
  text: string;
  main_pic: Picture;
  microgreens_use: PicArray;
  instruction_label:string;
  instruction_pic: Picture;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style({transform: 'translateY(10%)'}),
        animate('0.6s ease-out', style({transform: 'translateY(0%)'}))
      ]),
    ])
  ],
})
export class HomeComponent {
  loading = true;

  homeData$: Observable<HomeData> =
    this.singleTypesService.getHomeData<HomeData>()
      .pipe(
        tap(val => this.loading = val.loading),
        map(d => d.data));

  offers$: Observable<TextItem[]> =
    this.singleTypesService.getRestaurantOfferData<{offers: TextItem[]}>()
      .pipe(
        map(d => d.data.offers));


  constructor(
    @Inject(DOCUMENT) private document: Document,
    private singleTypesService: SingleTypesService,
    private imageService: ImageService,
    private router: Router,
  ) {
  }

  goTo(link: string): void {
    this.document.location.href = link;
  }

  getBase(): string {
    return this.imageService.getImageBase();
  }

  getObsSlides(slides: PicArray): Observable<PicArray> {
    return of(slides);
  }

  navigateToInstruction() {
    this.router.navigate(['/navody']);
  }
}

