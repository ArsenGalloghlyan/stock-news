import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  output,
  OutputEmitterRef,
} from '@angular/core';

@Directive({
  selector: '[appOutsideClick]',
  standalone: true,
})
export class OutsideClickDirective {
  handleEvent: OutputEmitterRef<void> = output();
  private elementRef: ElementRef = inject(ElementRef);

  @HostListener('document:mousedown', ['$event'])
  onClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.handleEvent.emit();
    }
  }
}
