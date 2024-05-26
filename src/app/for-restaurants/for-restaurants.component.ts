import { Component, OnInit } from '@angular/core';
import { map, Observable, of, tap } from "rxjs";
import { SingleTypesService } from "../apollo/single-types.service";
import { PicArray, PicItem, TextItem } from "../model/view";
import { ImageService } from "../image.service";
import { META_DATA } from "../meta/metadata";
import { Meta, Title } from "@angular/platform-browser";


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
export class ForRestaurantsComponent implements OnInit {

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
    private titleService: Title,
    private metaTagService: Meta,
  ) {}

  ngOnInit() {
    // metadata
    this.titleService.setTitle(META_DATA.restaurants.title);
    this.metaTagService.addTags(META_DATA.restaurants.tags);
  }


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
