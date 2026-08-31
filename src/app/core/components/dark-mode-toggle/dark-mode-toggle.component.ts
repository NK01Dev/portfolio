import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DarkModeService } from '../../../dark-mode.service';

@Component({
  selector: 'app-dark-mode-toggle',
  standalone: false,
  templateUrl: './dark-mode-toggle.component.html',
  styleUrl: './dark-mode-toggle.component.css'
})
export class DarkModeToggleComponent implements OnInit, OnDestroy {
  isDarkMode = false;
  private sub?: Subscription;

  constructor(private darkModeService: DarkModeService) {}

  ngOnInit(): void {
    // Subscribe reactively so icon updates when toggled externally
    this.sub = this.darkModeService.isDarkMode$.subscribe(
      isDark => (this.isDarkMode = isDark)
    );
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }
}
