import { Component } from '@angular/core';
import { map, Observable, of, tap } from "rxjs";
import { SingleTypesService } from "../apollo/single-types.service";
import { PicArray, PicItem, TextItem } from "../model/view";
import { ImageService } from "../image.service";


export type RestaurantData = {
  head: string;
  text: string;
  head_2: string;
  text_2: string;
  main_img: string;
  how_it_works: string;
  meals: PicArray;
}


@Component({
  selector: 'app-for-restaurants',
  templateUrl: './for-restaurants.component.html',
})
export class ForRestaurantsComponent {

  loading = true;

  restaurantData$: Observable<RestaurantData> =
    this.singleTypesService.getRestaurantData<RestaurantData>()
    .pipe(
      tap(val => this.loading = val.loading),
      map(d => d.data));


  offers$: Observable<TextItem[]> =
    this.singleTypesService.getRestaurantOfferData<{offers: TextItem[]}>()
      .pipe(
        map(d => d.data.offers));


  growOptions$: Observable<PicItem[]> =
    this.singleTypesService.getGrowOptionData<{items: PicItem[]}>()
      .pipe(
        map(d => d.data.items));

  constructor(
    private singleTypesService: SingleTypesService,
    private imageService: ImageService,
  ) {}


  getBase(): string {
    return this.imageService.getImageBase();
  }

  getObsSlides(slides: PicArray): Observable<PicArray> {
    return of(slides);
  }

  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}
