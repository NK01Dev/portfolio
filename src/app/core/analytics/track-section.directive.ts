import { Directive, ElementRef, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { AnalyticsService } from './analytics.service';

@Directive({ selector: '[appTrackSection]', standalone: true })
export class TrackSectionDirective implements OnInit, OnDestroy {
    @Input('appTrackSection') sectionName = '';

    private readonly element = inject(ElementRef<HTMLElement>);
    private readonly analytics = inject(AnalyticsService);
    private observer?: IntersectionObserver;
    private tracked = false;

    ngOnInit(): void {
        if (!this.sectionName || typeof IntersectionObserver === 'undefined') return;

        this.observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !this.tracked) {
                    this.tracked = true;
                    this.analytics.trackSectionView(this.sectionName);
                    this.observer?.disconnect();
                }
            },
            { threshold: 0.4 },
        );
        this.observer.observe(this.element.nativeElement);
    }

    ngOnDestroy(): void {
        this.observer?.disconnect();
    }
}