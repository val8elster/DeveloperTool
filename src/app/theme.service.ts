import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<boolean>(!this.isDarkTheme());
  theme$ = this.themeSubject.asObservable();

  constructor() { }

  isDarkTheme(): boolean {
    const theme = localStorage.getItem('theme');
    return theme === 'dark';
  }

  setTheme(isLightTheme: boolean) {
    const theme = isLightTheme ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
    this.updateTheme();
  }

  updateTheme() {
    const isDark = this.isDarkTheme();
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    this.themeSubject.next(!isDark);
  }
}

