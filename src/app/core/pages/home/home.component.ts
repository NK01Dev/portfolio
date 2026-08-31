import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AnimationsService } from '../../../animations.service';
import { DarkModeService } from '../../../dark-mode.service';

const HERO_MEDIA = {
  dark: {
    video: '/assets/videos/hero-dark.mp4',
    poster: '/assets/images/video-posters/hero-dark.webp',
  },
  light: {
    video: '/assets/videos/hero-light.mp4',
    poster: '/assets/images/video-posters/hero-light.webp',
  },
} as const;

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  currentVideo: string = HERO_MEDIA.dark.video;
  currentPoster: string = HERO_MEDIA.dark.poster;
  shouldAutoplay = true;

  words: string[] = ['Full-Stack Developer', 'Mobile Developer'];
  displayText = '';

  private currentWordIndex = 0;
  private currentCharIndex = 0;
  private isDeleting = false;
  private typeTimeoutId?: ReturnType<typeof setTimeout>;

  private routerSubscription?: Subscription;
  private darkModeSubscription?: Subscription;

  constructor(
    private router: Router,
    private animations: AnimationsService,
    private darkModeService: DarkModeService
  ) {}

  ngOnInit(): void {
    // Check user preference for reduced motion
    if (typeof window !== 'undefined' && window.matchMedia) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.shouldAutoplay = !prefersReducedMotion;
    }

    // Subscribe to dark mode state to reactively load only the active theme video
    this.darkModeSubscription = this.darkModeService.isDarkMode$.subscribe((isDark) => {
      const theme = isDark ? 'dark' : 'light';
      this.currentVideo = HERO_MEDIA[theme].video;
      this.currentPoster = HERO_MEDIA[theme].poster;
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

  ngOnDestroy(): void {
    if (this.typeTimeoutId) {
      clearTimeout(this.typeTimeoutId);
    }
    this.routerSubscription?.unsubscribe();
    this.darkModeSubscription?.unsubscribe();
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

