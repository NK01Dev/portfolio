import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimationsService } from '../../../animations.service';
import { DarkModeService } from '../../../dark-mode.service';
import { SmoothScrollService } from '../../../services/smooth-scroll.service';
import { SeoService } from '../../../services/seo.service';
import { AnalyticsService } from '../../analytics/analytics.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('darkVideo') darkVideoRef?: ElementRef<HTMLVideoElement>;
  @ViewChild('lightVideo') lightVideoRef?: ElementRef<HTMLVideoElement>;

  private readonly analytics = inject(AnalyticsService);

  shouldAutoplay = true;

  words: string[] = ['Software Engineer', 'Cross-Platform Developer', 'Flutter Developer', 'Full-Stack Developer'];
  displayText = '';

  private currentWordIndex = 0;
  private currentCharIndex = 0;
  private isDeleting = false;
  private typeTimeoutId?: ReturnType<typeof setTimeout>;

  private routerSubscription?: Subscription;
  private darkModeSubscription?: Subscription;
  private scrollTriggers: ScrollTrigger[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private animations: AnimationsService,
    private darkModeService: DarkModeService,
    private ngZone: NgZone,
    private smoothScroll: SmoothScrollService,
    private seoService: SeoService
  ) {}

  onSocialClick(platform: string): void {
    this.analytics.trackSocialClick(platform);
  }

  scrollToAbout(): void {
    this.analytics.trackNavigationClick('about');
    this.smoothScroll.scrollTo('#about', { offset: -80 });
  }

  scrollToContact(): void {
    this.analytics.trackNavigationClick('contact');
    this.smoothScroll.scrollTo('#contact', { offset: -80 });
  }

  ngOnInit(): void {
    this.seoService.updateSeo({
      title: 'Kamal Naim — Software Engineer & Cross-Platform Developer',
      description:
        'Official portfolio of Kamal Naim, Software Engineer specializing in Flutter, TypeScript, Angular, and Node.js. Building scalable applications, cloud pipelines, and robust infrastructure.',
      canonicalUrl: 'https://kamalnaim.vercel.app/',
      breadcrumbs: [{ name: 'Home', url: 'https://kamalnaim.vercel.app/' }],
    });

    // Check user preference for reduced motion
    if (typeof window !== 'undefined' && window.matchMedia) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.shouldAutoplay = !prefersReducedMotion;
    }

    // Subscribe to dark mode state to reactively play the active theme video
    this.darkModeSubscription = this.darkModeService.isDarkMode$.subscribe((isDark) => {
      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => {
          const activeVideo = isDark ? this.darkVideoRef?.nativeElement : this.lightVideoRef?.nativeElement;
          if (activeVideo && this.shouldAutoplay) {
            activeVideo.play().catch(() => {});
          }
        }, 60);
      }
    });

    this.type(); // Start the typewriter effect

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.animations.pageTransitionOut('.page-content');
      }
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.animations.pageTransitionIn('.page-content');
        }, 100);
      }
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    setTimeout(() => {
      this.scrollTriggers = this.animations.initScrollTextAnimations();
    }, 150);
  }

  ngOnDestroy(): void {
    if (this.typeTimeoutId) {
      clearTimeout(this.typeTimeoutId);
    }
    this.routerSubscription?.unsubscribe();
    this.darkModeSubscription?.unsubscribe();

    this.scrollTriggers.forEach((t) => t.kill());
    this.scrollTriggers = [];
  }

  redirectToMedia(name: string): void {
    switch (name) {
      case 'linkedin':
        window.open('https://www.linkedin.com/in/kamal-naim-014989310/', '_blank', 'noopener,noreferrer');
        break;
      case 'github':
        window.open('https://github.com/NK01Dev', '_blank', 'noopener,noreferrer');
        break;
      case 'x':
        window.open('https://twitter.com/', '_blank', 'noopener,noreferrer');
        break;
    }
  }

  private type(): void {
    const currentWord = this.words[this.currentWordIndex];

    if (this.isDeleting) {
      this.displayText = currentWord.substring(0, this.currentCharIndex - 1);
      this.currentCharIndex--;
      if (this.currentCharIndex === 0) {
        this.isDeleting = false;
        this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
      }
    } else {
      this.displayText = currentWord.substring(0, this.currentCharIndex + 1);
      this.currentCharIndex++;
      if (this.currentCharIndex === currentWord.length) {
        this.isDeleting = true;
      }
    }

    this.typeTimeoutId = setTimeout(
      () => this.type(),
      this.isDeleting ? 100 : 150
    );
  }
}
