import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appDarkMode]'
})
export class DarkModeDirective {

  @HostListener('input', ['$event.target'])
  onInput(target: HTMLInputElement) {
    const darkModeEnabled = target.value === '1';
    if (darkModeEnabled) {
      document.body.classList.add('cssdarkmode');
    } else {
      document.body.classList.remove('cssdarkmode');
    }
  }

}