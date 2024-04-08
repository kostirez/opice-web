import {  Component, Input, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from "rxjs";
import { transition, trigger, useAnimation } from "@angular/animations";
import { fadeIn, fadeOut } from "./carousel.animation";
import { PicArray, Picture } from "../model/view";
import { ImageService } from "../image.service";



@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  animations: [
    trigger("carouselAnimation", [
      transition("void => *", [useAnimation(fadeIn, {params: { time: '500ms' }} )]),
      transition("* => void", [useAnimation(fadeOut, {params: { time: '500ms' }})]),
    ])
  ]
})
export class CarouselComponent implements OnInit{
  @Input() delay: number = 5000;
  @Input({ required: true }) slides$: Observable<PicArray>;
  @Input() showBtns: boolean = false;
  step = 0;
  slides: PicArray = []

  sub: Subscription | undefined = undefined;

  constructor(private imageService: ImageService) {
  }

  ngOnInit() {
    this.sub = this.slides$.subscribe(s =>
      this.slides = s)
    if (this.delay != 0) {
      this.sub = interval(this.delay).subscribe(x => {
        this.move(1)
      });
    }
  }

  ngOnDestroyd(): void{
    this.sub?.unsubscribe()
  }

  move(num: number): void {
    this.step += num;
    if (this.step >= this.slides.length) {
      this.step = 0;
    }
    if (this.step < 0) {
      this.step = this.slides.length -1;
    }
  }

  getBase(): string {
    return this.imageService.getImageBase();
  }

}
