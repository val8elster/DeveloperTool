import { Component, HostListener , OnInit} from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
 
})

export class AppComponent implements OnInit {

  title = 'Developer Tool';

  constructor(private themeService: ThemeService) {}
 
  ngOnInit() {
    this.themeService.updateTheme();
  }

  isDarkTheme(): boolean {
    const theme = localStorage.getItem('theme');
    return theme === 'dark';
  }

  toggleTheme(isLightTheme: boolean) {
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
  }

  @HostListener('window:storage', ['$event'])
  onStorageChange(event: StorageEvent) {
    if (event.key === 'theme') {
      this.updateTheme();
    }
  }
  onThemeSwitchChange(event: any): void {
    const isLight = event.target.value == 1;
    this.toggleTheme(isLight);

  }
}
