import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { META_DATA } from "./meta/metadata";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(
    private titleService: Title,
    private metaTagService: Meta,
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle(META_DATA.home.title);
    this.metaTagService.addTags(META_DATA.home.tags);
  }

}
