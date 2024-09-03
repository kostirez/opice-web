import { Component, Input } from '@angular/core';
import { BaseComponent } from "../base/base.component";
import { BtnData } from "../../model/view";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent  extends BaseComponent{
  @Input() override data: {}

  btn: BtnData = {
    text: 'přejít na hlavní stranu',
    link: '/',
    style: 'primary',
  }

}
