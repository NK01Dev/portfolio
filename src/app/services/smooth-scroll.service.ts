import { Inject, Injectable, NgZone, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({
  providedIn: 'root'
})
export class SmoothScrollService implements OnDestroy {
  private lenis: Lenis | null = null;
  private tickerCallback: ((time: number) => void) | null = null;
  private routerSub: Subscription | null = null;
  private isInitialized = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private ngZone: NgZone
  ) {}

  /**
   * Initialize Lenis smooth scroll and synchronize with GSAP ScrollTrigger.
   * Safe to call on both browser and SSR environments.
   */
  init(): void {
    if (!isPlatformBrowser(this.platformId) || this.isInitialized) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      // Register GSAP plugins
      gsap.registerPlugin(ScrollTrigger);

      // Initialize Lenis with cinematic inertia scrolling curve
      this.lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        touchMultiplier: 1.8,
      });

      // Synchronize Lenis scroll updates with GSAP ScrollTrigger
      this.lenis.on('scroll', ScrollTrigger.update);

      // Drive Lenis RAF updates through GSAP's central ticker
      this.tickerCallback = (time: number) => {
        this.lenis?.raf(time * 1000);
      };
      gsap.ticker.add(this.tickerCallback);

      // Disable lagSmoothing so GSAP and Lenis remain strictly in sync without jumps
      gsap.ticker.lagSmoothing(0);

      this.isInitialized = true;
    });

    // Hook into Angular Router events to refresh pin positions after route transitions
    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          if (isPlatformBrowser(this.platformId)) {
            ScrollTrigger.refresh();
          }
        }, 150);
      }
    });
  }

  /**
   * Smoothly scroll to a selector, element, or pixel offset using Lenis.
   */
  scrollTo(target: string | HTMLElement | number, options?: { offset?: number; immediate?: boolean; duration?: number }): void {
    if (!isPlatformBrowser(this.platformId)) return;

    if (this.lenis) {
      this.lenis.scrollTo(target, options);
    } else if (typeof target === 'string' && typeof document !== 'undefined') {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /**
   * Recalculate all ScrollTrigger pin measurements and layouts.
   */
  refresh(): void {
    if (isPlatformBrowser(this.platformId)) {
      ScrollTrigger.refresh();
    }
  }

  /**
   * Get the active Lenis instance if initialized.
   */
  get instance(): Lenis | null {
    return this.lenis;
  }

  /**
   * Teardown Lenis, GSAP ticker subscriptions, and router listeners to prevent leaks.
   */
  destroy(): void {
    this.routerSub?.unsubscribe();
    this.routerSub = null;

    if (this.tickerCallback) {
      gsap.ticker.remove(this.tickerCallback);
      this.tickerCallback = null;
    }

    if (this.lenis) {
      this.lenis.destroy();
      this.lenis = null;
    }

    this.isInitialized = false;
  }

  ngOnDestroy(): void {
    this.destroy();
  }
}
