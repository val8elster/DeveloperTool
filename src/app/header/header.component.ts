
import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.css'],
  templateUrl: 'header.component.html'
})
export class HeaderComponent  {
  isLightTheme = true;

  onThemeSwitchChange(event: any): void {
    this.isLightTheme = event.target.value === '1';
    this.applyTheme();
  }

  applyTheme(): void {
    if (this.isLightTheme) {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    } else {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    }
  }

  // Optional: Wenn du das initiale Thema laden möchtest
  ngOnInit(): void {
    this.applyTheme();
  }
}

