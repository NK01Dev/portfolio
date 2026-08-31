import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private readonly DARK_MODE_KEY = 'darkMode';
  private readonly isDarkModeSubject = new BehaviorSubject<boolean>(false);
  readonly isDarkMode$: Observable<boolean> = this.isDarkModeSubject.asObservable();

  constructor() { 
    const savedMode = localStorage.getItem(this.DARK_MODE_KEY);
    const initialMode = savedMode ? JSON.parse(savedMode) : false;
    this.isDarkModeSubject.next(initialMode);
    this.applyDarkMode(initialMode);
  }

  toggleDarkMode(): void {
    const newMode = !this.isDarkModeSubject.value;
    this.isDarkModeSubject.next(newMode);
    localStorage.setItem(this.DARK_MODE_KEY, JSON.stringify(newMode));
    this.applyDarkMode(newMode);
  }

  private applyDarkMode(isDark: boolean): void {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  getIsDarkMode(): boolean {
    return this.isDarkModeSubject.value;
  }
}
