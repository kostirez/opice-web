import { Component, Input } from '@angular/core';
import { BaseComponent } from "../base/base.component";
import { Picture } from "../../model/view";
import { ImageService } from "../../image.service";

@Component({
  selector: 'app-title-and-pic',
  templateUrl: './title-and-pic.component.html',
})
export class TitleAndPicComponent extends BaseComponent {
  @Input() override data: {
    head: string,
    pics: Picture[]
  };

  constructor(
    private imageService: ImageService
  ) {
    super();
  }

  getBase(): string {
    return this.imageService.getImageBase();
  }

}
