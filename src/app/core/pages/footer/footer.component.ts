import { Component, inject } from '@angular/core';
import { AnalyticsService } from '../../analytics/analytics.service';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();

  private readonly analytics = inject(AnalyticsService);

  onSocialClick(platform: string): void {
    this.analytics.trackSocialClick(platform);
  }

  onEmailClick(): void {
    this.analytics.trackEmailClick();
  }
}
