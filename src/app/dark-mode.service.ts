import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private readonly DARK_MODE_KEY = 'darkMode';
  private isDarkMode = false;

  constructor() { 
    const savedMode = localStorage.getItem(this.DARK_MODE_KEY);
    this.isDarkMode = savedMode ? JSON.parse(savedMode) : false;
    this.applyDarkMode();
  }
  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem(this.DARK_MODE_KEY, JSON.stringify(this.isDarkMode));
    this.applyDarkMode();
  }

  private applyDarkMode(): void {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  getIsDarkMode(): boolean {
    return this.isDarkMode;
  }
}
