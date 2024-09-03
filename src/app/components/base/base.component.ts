import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
})
export class BaseComponent {
  @Input() data: any | undefined;
  @HostBinding('class') classes: string = '';

  ngOnInit() {
  }

}
