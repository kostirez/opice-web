import { Component, Input } from '@angular/core';
import { BaseComponent } from "../base/base.component";
import { BtnData, Picture } from "../../model/view";
import { ImageService } from "../../image.service";

@Component({
  selector: 'app-pic-and-text',
  templateUrl: './pic-and-text.component.html',
})
export class PicAndTextComponent extends BaseComponent {
  @Input() override data: {
    head: string,
    text: string,
    pic: Picture,
    btn: BtnData,
    layout: string,
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
