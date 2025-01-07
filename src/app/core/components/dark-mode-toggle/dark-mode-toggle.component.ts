import { Component } from '@angular/core';
import { DarkModeService } from '../../../dark-mode.service';

@Component({
  selector: 'app-dark-mode-toggle',
  standalone: false,
  
  templateUrl: './dark-mode-toggle.component.html',
  styleUrl: './dark-mode-toggle.component.css'
})
export class DarkModeToggleComponent {
  isDarkMode = false;
  constructor(private darkModeService: DarkModeService) {
    this.isDarkMode = this.darkModeService.getIsDarkMode();
  }
  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
    this.isDarkMode = this.darkModeService.getIsDarkMode();
  }
}
