import { Component, Input } from '@angular/core';
import { BaseComponent } from "../base/base.component";
import { Picture } from "../../model/view";
import { ImageService } from "../../image.service";

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
})
export class StepsComponent extends BaseComponent {
  @Input() override data: {
    head: string,
    pics: Picture[],
    steps: {
      text: string,
      head: string;
    }[]
  }

  selectedStep = 1;

  constructor(
    private imageService: ImageService,
  ) {
    super();
  }

  move(step: number, length: number) {
    this.selectedStep += step;
    this.selectedStep = this.selectedStep % length;
  }

  getBase(): string {
    return this.imageService.getImageBase();
  }
}
