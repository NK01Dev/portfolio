import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Project } from '../../../models/project.interface';

@Component({
  selector: 'app-work',
  standalone: false,
  templateUrl: './work.component.html',
  styleUrl: './work.component.css',
})
export class WorkComponent implements AfterViewInit, OnDestroy {
  @ViewChild('containerEl') containerEl!: ElementRef<HTMLElement>;
  @ViewChild('trackEl') trackEl!: ElementRef<HTMLElement>;

  scrollProgress = 0;
  currentIndex = 0;
  isDesktop = true;

  private tween: gsap.core.Tween | null = null;
  private resizeObserver: ResizeObserver | null = null;

  readonly projects: Project[] = [
    {
      id: 'wifi-manager',
      number: '01',
      title: 'WiFi Manager',
      type: 'desktop',
      category: 'WINDOWS · DESKTOP',
      descriptionKey: 'WORK.WIFI_MANAGER.DESCRIPTION',
      technologies: [
        'Flutter',
        'Riverpod',
        'Drift',
        'SQLite',
        'Clean Arch',
        'AES-256',
      ],
      heroImage: '/assets/projects/wifi-manager/hero.webp',
      image: '/assets/projects/wifi-manager/hero.webp',
      imageAlt: 'WiFi Manager enterprise desktop network management and analytics dashboard',
      repositoryUrl: 'https://github.com/NK01Dev/flutter_wifi_manager',
      caseStudyUrl: 'https://github.com/NK01Dev/flutter_wifi_manager#readme',
    },
    {
      id: 'quoteverse',
      number: '02',
      title: 'QuoteVerse',
      type: 'mobile',
      category: 'MOBILE · OFFLINE-FIRST',
      descriptionKey: 'WORK.QUOTEVERSE.DESCRIPTION',
      technologies: [
        'Flutter',
        'Riverpod',
        'Isar',
        'Supabase',
        'GoRouter',
        'AdMob',
      ],
      heroImage: '/assets/projects/quoteverse/hero.webp',
      image: '/assets/projects/quoteverse/hero.webp',
      imageAlt: 'QuoteVerse mobile application showing multilingual daily quotes interface',
      screenshots: [
        '/assets/projects/quoteverse/01.webp',
        '/assets/projects/quoteverse/02.webp',
        '/assets/projects/quoteverse/03.webp',
        '/assets/projects/quoteverse/04.webp',
        '/assets/projects/quoteverse/05.webp',
        '/assets/projects/quoteverse/06.webp',
      ],
      repositoryUrl: 'https://github.com/NK01Dev/quote_verse',
      caseStudyUrl: 'https://github.com/NK01Dev/quote_verse#readme',
    },
    {
      id: 'blueprint',
      number: '03',
      title: 'BluePrint Academy',
      type: 'web',
      category: 'FULL-STACK · EDTECH PLATFORM',
      descriptionKey: 'WORK.BLUEPRINT.DESCRIPTION',
      technologies: [
        'Angular 19',
        'Node.js',
        'Express',
        'MongoDB',
        'TailwindCSS',
        'WebSockets',
      ],
      heroImage: '/assets/projects/blueprint/hero.webp',
      image: '/assets/projects/blueprint/hero.webp',
      imageAlt: 'BluePrint Academy interactive learning platform web interface',
      repositoryUrl: 'https://github.com/NK01Dev',
      caseStudyUrl: 'https://github.com/NK01Dev',
    },
    {
      id: 'omnipulse',
      number: '04',
      title: 'OmniPulse Cloud',
      type: 'web',
      category: 'MOBILE & SYSTEMS · CLOUD SYNC',
      descriptionKey: 'WORK.OMNIPULSE.DESCRIPTION',
      technologies: [
        'Flutter',
        'Node.js',
        'Docker',
        'Firebase',
        'REST API',
        'Redis',
      ],
      heroImage: '/assets/projects/omnipulse/hero.webp',
      image: '/assets/projects/omnipulse/hero.webp',
      imageAlt: 'OmniPulse real-time cloud data sync interface',
      repositoryUrl: 'https://github.com/NK01Dev',
      caseStudyUrl: 'https://github.com/NK01Dev',
    },
  ];

  get totalProjectsFormatted(): string {
    const count = this.projects.length;
    return count < 10 ? `0${count}` : `${count}`;
  }

  get currentActiveIndex(): string {
    const num = this.currentIndex + 1;
    return num < 10 ? `0${num}` : `${num}`;
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.checkScreenMode();

    setTimeout(() => {
      if (this.isDesktop) {
        this.initHorizontalScroll();
      }
    }, 100);
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const wasDesktop = this.isDesktop;
    this.checkScreenMode();

    if (wasDesktop !== this.isDesktop) {
      if (this.isDesktop) {
        this.initHorizontalScroll();
      } else {
        this.destroyScroll();
      }
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (!isPlatformBrowser(this.platformId) || !this.isDesktop) return;

    // Only respond when work section is near or in viewport
    const container = this.containerEl?.nativeElement;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!isInView) return;

    if (event.key === 'ArrowRight') {
      this.nextProject();
    } else if (event.key === 'ArrowLeft') {
      this.prevProject();
    }
  }

  nextProject(): void {
    if (this.currentIndex < this.projects.length - 1) {
      this.scrollToIndex(this.currentIndex + 1);
    }
  }

  prevProject(): void {
    if (this.currentIndex > 0) {
      this.scrollToIndex(this.currentIndex - 1);
    }
  }

  scrollToIndex(targetIndex: number): void {
    if (!isPlatformBrowser(this.platformId) || !this.isDesktop) return;

    const container = this.containerEl?.nativeElement;
    const track = this.trackEl?.nativeElement;
    if (!container || !track) return;

    const cards = track.querySelectorAll('app-project-card');
    if (!cards || cards.length === 0) return;

    const clampedIndex = Math.max(0, Math.min(targetIndex, this.projects.length - 1));
    this.currentIndex = clampedIndex;

    const targetCard = cards[clampedIndex] as HTMLElement;
    if (!targetCard) return;

    const targetX = targetCard.offsetLeft - 80;
    const maxScroll = Math.max(0, track.scrollWidth - window.innerWidth);
    const clampedX = Math.max(0, Math.min(targetX, maxScroll));

    if (this.tween && this.tween.scrollTrigger) {
      const st = this.tween.scrollTrigger;
      const progress = maxScroll > 0 ? clampedX / maxScroll : 0;
      const targetScroll = st.start + progress * (st.end - st.start);
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  }

  private checkScreenMode(): void {
    if (typeof window !== 'undefined') {
      this.isDesktop = window.innerWidth >= 768;
    }
  }

  private initHorizontalScroll(): void {
    this.destroyScroll();

    const container = this.containerEl?.nativeElement;
    const track = this.trackEl?.nativeElement;
    if (!container || !track) return;

    this.ngZone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger);

      const getScrollAmount = () => {
        return Math.max(0, track.scrollWidth - window.innerWidth + 80);
      };

      const scrollAmount = getScrollAmount();
      if (scrollAmount <= 0) return;

      this.tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 0.8,
          start: 'top top',
          end: () => '+=' + getScrollAmount(),
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            this.ngZone.run(() => {
              this.scrollProgress = Math.round(self.progress * 100);
              const total = this.projects.length;
              const idx = Math.min(
                total - 1,
                Math.floor(self.progress * total)
              );
              this.currentIndex = idx;
            });
          },
        },
      });

      if (typeof ResizeObserver !== 'undefined') {
        this.resizeObserver = new ResizeObserver(() => {
          ScrollTrigger.refresh();
        });
        this.resizeObserver.observe(track);
      }
    });
  }

  private destroyScroll(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }

    if (this.tween) {
      if (this.tween.scrollTrigger) {
        this.tween.scrollTrigger.kill();
      }
      this.tween.kill();
      this.tween = null;
    }

    const track = this.trackEl?.nativeElement;
    if (track) {
      gsap.set(track, { clearProps: 'transform' });
    }
  }

  ngOnDestroy(): void {
    this.destroyScroll();
    if (isPlatformBrowser(this.platformId)) {
      ScrollTrigger.refresh();
    }
  }
}
