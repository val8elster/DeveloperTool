// header.component.ts

import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '../darkMode/dark-mode.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private darkModeService: DarkModeService) { }

  ngOnInit(): void {
  }

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode(); // Umschalten des Dark Modes
  }

  isDarkMode() {
    return this.darkModeService.isDarkMode(); // Abrufen des aktuellen Modus
  }

}
