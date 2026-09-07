import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { ANALYTICS_EVENTS } from './analytics.events';
import { AnalyticsEventName, AnalyticsEventParams } from './analytics.types';
import { environment } from '../../../environments/environment';

declare global {
    interface Window {
        dataLayer: unknown[];
        gtag?: (...args: unknown[]) => void;
    }
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
    private readonly router = inject(Router);
    private readonly measurementId = environment.analytics.googleAnalyticsId;
    private lastTrackedPath = '';

    constructor() {
        if (!environment.production) return;

        this.setupRouteTracking();

        if (this.router.navigated && this.router.url) {
            this.trackPageView(this.router.url);
        }
    }

    private setupRouteTracking(): void {
        this.router.events
            .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
            .subscribe((e) => this.trackPageView(e.urlAfterRedirects || e.url));
    }

    trackPageView(path: string): void {
        if (!this.isAvailable()) return;
        if (this.lastTrackedPath === path) return;
        this.lastTrackedPath = path;

        window.gtag?.('event', 'page_view', {
            page_title: typeof document !== 'undefined' ? document.title : '',
            page_location: typeof window !== 'undefined' ? window.location.origin + path : path,
            page_path: path,
        });
    }

    trackEvent(eventName: AnalyticsEventName, parameters: AnalyticsEventParams = {}): void {
        if (!this.isAvailable()) return;
        window.gtag?.('event', eventName, parameters);
    }

    trackSectionView(section: string): void {
        this.trackEvent(ANALYTICS_EVENTS.SECTION_VIEW, { section });
    }

    trackNavigationClick(section: string): void {
        this.trackEvent(ANALYTICS_EVENTS.NAVIGATION_CLICK, { section });
    }

    trackProjectView(projectId: string, projectName?: string): void {
        this.trackEvent(ANALYTICS_EVENTS.PROJECT_VIEW, { project_id: projectId, project_name: projectName });
    }

    trackProjectDemoClick(projectId: string): void {
        this.trackEvent(ANALYTICS_EVENTS.PROJECT_DEMO_CLICK, { project_id: projectId });
    }

    trackProjectGithubClick(projectId: string): void {
        this.trackEvent(ANALYTICS_EVENTS.PROJECT_GITHUB_CLICK, { project_id: projectId });
    }

    trackResumeDownload(): void {
        this.trackEvent(ANALYTICS_EVENTS.RESUME_DOWNLOAD);
    }

    trackContactSubmit(): void {
        this.trackEvent(ANALYTICS_EVENTS.CONTACT_SUBMIT, { form: 'contact' });
    }

    trackEmailClick(): void {
        this.trackEvent(ANALYTICS_EVENTS.EMAIL_CLICK);
    }

    trackSocialClick(platform: string): void {
        this.trackEvent(ANALYTICS_EVENTS.SOCIAL_CLICK, { platform });
    }

    trackLanguageChange(language: string): void {
        this.trackEvent(ANALYTICS_EVENTS.LANGUAGE_CHANGE, { language });
    }

    trackThemeChange(theme: string): void {
        this.trackEvent(ANALYTICS_EVENTS.THEME_CHANGE, { theme });
    }

    private isAvailable(): boolean {
        return (
            environment.production &&
            Boolean(this.measurementId) &&
            typeof window !== 'undefined' &&
            typeof window.gtag === 'function'
        );
    }
}