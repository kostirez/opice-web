import { Component, Inject, Input } from '@angular/core';
import { BaseComponent } from "../base/base.component";
import { BtnData } from "../../model/view";
import { DOCUMENT } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html',
})
export class BtnComponent extends BaseComponent {
  @Input() override data: BtnData;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
  ) {
    super();
  }

  goTo(): void {
    let fragments = this.data.link.split('#')
    let fragment = '';
    if(fragments.length>1) {
      fragment=fragments[1];
    }
    console.log(fragments)
    this.router.navigate(
      [ '/', ...fragments[0].split('/')],
      {fragment});
  }
}
