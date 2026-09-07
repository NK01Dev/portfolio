import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SmoothScrollService } from './services/smooth-scroll.service';
import { AnimationsService } from './animations.service';
import { AnalyticsService } from './core/analytics/analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Kamal naim';
  private readonly analytics = inject(AnalyticsService);
  constructor(
    translate: TranslateService,
    private smoothScrollService: SmoothScrollService,
    private animationsService: AnimationsService
  ) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    this.smoothScrollService.init();
    // Wait for DOM to fully render all sections before initializing ScrollTrigger
    setTimeout(() => {
      this.animationsService.initSectionReveals();
    }, 300);
  }

  ngOnDestroy(): void {
    this.smoothScrollService.destroy();
  }
}
