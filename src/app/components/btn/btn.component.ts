import { Component, Inject, Input } from '@angular/core';
import { BaseComponent } from "../base/base.component";
import { BtnData } from "../../model/view";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html',
})
export class BtnComponent extends BaseComponent {
  @Input() override data: BtnData;

  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) {
    super();
  }
}
