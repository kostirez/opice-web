import { Component, OnInit } from '@angular/core';
import { map, Observable } from "rxjs";
import { Picture, TextItem } from "../model/view";
import { SingleTypesService } from "../apollo/single-types.service";
import { ImageService } from "../image.service";
import { Meta, Title } from "@angular/platform-browser";
import { META_DATA } from "../meta/metadata";

interface InstructionData {
  head: string;
  text: string;
  head_2: string;
  text_2: string;
  steps_sklenice: TextItem[];
  steps_sitka: TextItem[];
  headSklenice: string;
  headMisky: string;
  table_1: string;
  table_2: string;
  toSprout: string;
  toNotSprout: string;
  main_pic: Picture;
  skleniceImg: Picture;
  miskaImg: Picture;
}

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
})
export class InstructionComponent implements OnInit {

  selectedSklenice = 0;
  selectedMiska = 0;

  instruction$: Observable<InstructionData> =
    this.singleTypesService.getInstructionData<InstructionData>()
      .pipe(
        map(d => d.data),
      );

  constructor(
    private singleTypesService: SingleTypesService,
    private imageService: ImageService,
    private titleService: Title,
    private metaTagService: Meta,
  ) {}

  ngOnInit() {
    // metadata
    this.titleService.setTitle(META_DATA['navod'].title);
    this.metaTagService.addTags(META_DATA['navod'].tags);
  }

  moveSklenice(step: number, length: number) {
    this.selectedSklenice += step;
    this.selectedSklenice = this.selectedSklenice % length;
  }

  moveMisky(step: number, length: number) {
    this.selectedMiska += step;
    this.selectedMiska = this.selectedMiska % length;
  }

  getBase(): string {
    return this.imageService.getImageBase();
  }

}
