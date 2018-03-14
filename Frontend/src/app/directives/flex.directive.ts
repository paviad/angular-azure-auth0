import { Directive, HostBinding } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[flex]'
})
export class FlexDirective {
  @HostBinding('style.display') display = 'flex';

  constructor() { }

}
