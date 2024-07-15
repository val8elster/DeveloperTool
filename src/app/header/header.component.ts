import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLightTheme = true;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.loadTheme(); // Load saved theme preference
    this.themeService.isLightTheme$.subscribe(isLight => {
      this.isLightTheme = isLight; // Update theme switch state
    });
  }

  onThemeSwitchChange(event: any): void {
    this.isLightTheme = event.target.value === '1';
    this.themeService.setLightTheme(this.isLightTheme); // Update theme based on slider input
  }
}
