import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'theme';
  private isLightThemeSubject = new BehaviorSubject<boolean>(true);
  isLightTheme$ = this.isLightThemeSubject.asObservable();

  constructor() {}

  loadTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    if (savedTheme) {
      this.isLightThemeSubject.next(savedTheme === 'light');
    }
  }

  setLightTheme(isLightTheme: boolean): void {
    const theme = isLightTheme ? 'light' : 'dark';
    localStorage.setItem(this.THEME_KEY, theme);
    this.isLightThemeSubject.next(isLightTheme);
    this.updateTheme(isLightTheme);
  }

  private updateTheme(isLightTheme: boolean): void {
    const root = document.documentElement;
    if (isLightTheme) {
      root.style.setProperty('--background-color', '#B5D7F5');
      root.style.setProperty('--box-color','#8A2BE2')
      root.style.setProperty('--text-color', '#ffffff');
      root.style.setProperty('--highlight','#ffffff');
    } else {
        //darkmode
      root.style.setProperty('--background-color', '#131415');
      root.style.setProperty('--box-color', '#2B2C31')
      root.style.setProperty('--text-color', '#ffffff');
      root.style.setProperty('--highlight','#ffffff' )
    }
  }
}
