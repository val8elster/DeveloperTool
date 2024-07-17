import { Component, OnInit, ElementRef, Renderer2, HostListener } from '@angular/core';
import customTheme from '../lightmode/custom-themes'; // Adjust the import path as needed

@Component({
  selector: 'app-theme-integration',
  template: `<ng-content></ng-content>`,
  styles: []
})
export class ThemeIntegrationComponent implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.applyTheme();
    this.listenForThemeChanges();
  }

  @HostListener('window:storage', ['$event'])
  handleStorageChange(event: StorageEvent): void {
    if (event.key === 'theme') {
      this.applyTheme();
    }
  }

  private applyTheme(): void {
    const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const bgTextInputColor = theme === 'dark'
      ? customTheme.colorSchemes.dark.palette['bg-text-input']
      : customTheme.colorSchemes.light.palette['bg-text-input'];

    this.renderer.setStyle(document.documentElement, '--bg-text-input', bgTextInputColor);
    this.renderer.setAttribute(document.documentElement, 'data-theme', theme);
  }

  private listenForThemeChanges(): void {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', this.applyTheme.bind(this));
  }
}