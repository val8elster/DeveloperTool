// dark-mode.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  private darkMode: boolean = false;

  constructor() {
    // Überprüfe, ob der Dark-Mode in localStorage gespeichert ist
    this.darkMode = localStorage.getItem('darkMode') === 'true';
    this.applyTheme();
  }

  // Funktion zum Umschalten des Modus
  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkMode', this.darkMode.toString());
    this.applyTheme();
  }

  // Funktion zum Abrufen des aktuellen Modus
  isDarkMode() {
    return this.darkMode;
  }

  // Funktion zum Anwenden des aktuellen Themes
  private applyTheme() {
    const body = document.getElementsByTagName('body')[0];
    if (this.darkMode) {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }
  }
}
