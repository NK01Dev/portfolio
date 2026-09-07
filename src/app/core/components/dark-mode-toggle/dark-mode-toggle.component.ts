import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { DarkModeService } from '../../../dark-mode.service';
import { AnalyticsService } from '../../analytics/analytics.service';

@Component({
  selector: 'app-dark-mode-toggle',
  standalone: false,
  templateUrl: './dark-mode-toggle.component.html',
  styleUrl: './dark-mode-toggle.component.css'
})
export class DarkModeToggleComponent implements OnInit, OnDestroy {
  isDarkMode = false;
  private sub?: Subscription;
  private readonly analytics = inject(AnalyticsService);

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
    const nextTheme = !this.isDarkMode ? 'dark' : 'light';
    this.darkModeService.toggleDarkMode();
    this.analytics.trackThemeChange(nextTheme);
  }
}
