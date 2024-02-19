import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appUppercase]'
})
export class UppercaseDirective {

  constructor(private el: ElementRef) {
  }

  @HostListener('input') onInput() {
    const inputValue: string = this.el.nativeElement.value;
    this.el.nativeElement.value = inputValue.toUpperCase();
  }
}
