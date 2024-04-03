import { AfterViewInit, Component, Input } from '@angular/core';
import { interval, Subscription } from "rxjs";
import { animate, style, transition, trigger, useAnimation } from "@angular/animations";
import { fadeIn, fadeOut } from "./carousel.animation";



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
export class CarouselComponent implements AfterViewInit{
  @Input() delay: number = 5000;
  @Input({ required: true }) slides: string[] = [];
  @Input() showBtns: boolean = false;
  step = 0;

  selectedSlide: string | undefined  = undefined;

  sub: Subscription | undefined = undefined;

  constructor() {

  }

  ngAfterViewInit(): void {
    console.log(this.slides)
    this.selectedSlide = this.slides[0];
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

    this.selectedSlide = this.slides[this.step];
  }

}
