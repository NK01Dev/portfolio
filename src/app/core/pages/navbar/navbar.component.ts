import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AnimationsService } from '../../../animations.service';
import { DarkModeService } from '../../../dark-mode.service';

export type NavbarState = 'hero' | 'scrolled';

export interface NavItem {
  id: string;
  labelKey: string;
  anchor: string;
}

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {

  // ─── Template refs ─────────────────────────────────────────────────────────
  @ViewChild('navbarEl') navbarEl!: ElementRef<HTMLElement>;
  @ViewChild('mobileOverlayEl') mobileOverlayEl!: ElementRef<HTMLElement>;

  // ─── State ─────────────────────────────────────────────────────────────────
  navbarState: NavbarState = 'hero';
  isMobileMenuOpen = false;
  activeSection = 'home';
  isDarkMode = false;

  // ─── Nav items ─────────────────────────────────────────────────────────────
  readonly navItems: NavItem[] = [
    { id: 'home',       labelKey: 'NAVBAR.HOME',       anchor: '.home-section' },
    { id: 'work',       labelKey: 'NAVBAR.WORK',       anchor: '.work-section' },
    { id: 'about',      labelKey: 'NAVBAR.ABOUT',      anchor: '.about-section' },
    { id: 'experience', labelKey: 'NAVBAR.EXPERIENCE', anchor: '.experience-section' },
    { id: 'contact',    labelKey: 'NAVBAR.CONTACT',    anchor: '.contact-section' },
  ];

  // ─── Private ───────────────────────────────────────────────────────────────
  private readonly SCROLL_THRESHOLD = 80;
  private scrollListener!: () => void;
  private observer!: IntersectionObserver;
  private darkModeSub?: Subscription;
  private lastScrolled = false; // track previous state to avoid redundant updates

  constructor(
    private router: Router,
    private translate: TranslateService,
    private animations: AnimationsService,
    private darkModeService: DarkModeService,
    private ngZone: NgZone,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngOnInit(): void {
    // Reactive dark mode
    this.darkModeSub = this.darkModeService.isDarkMode$.subscribe(
      isDark => (this.isDarkMode = isDark)
    );

    // Navbar enter animation (after first render tick)
    setTimeout(() => {
      if (this.navbarEl?.nativeElement) {
        this.animations.animateNavbarEnter(this.navbarEl.nativeElement);
      }
    }, 50);

    // Efficient scroll detection — outside Angular zone
    this.scrollListener = () => {
      const scrolled = window.scrollY >= this.SCROLL_THRESHOLD;
      if (scrolled !== this.lastScrolled) {
        this.lastScrolled = scrolled;
        this.ngZone.run(() => {
          this.navbarState = scrolled ? 'scrolled' : 'hero';
        });
      }
    };

    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.scrollListener, { passive: true });
    });

    // IntersectionObserver for active section
    this.setupIntersectionObserver();

    // ESC key to close mobile menu
    this.document.addEventListener('keydown', this.onKeyDown);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollListener);
    this.observer?.disconnect();
    this.document.removeEventListener('keydown', this.onKeyDown);
    this.darkModeSub?.unsubscribe();

    // Restore body scroll if destroyed while open
    if (this.isMobileMenuOpen) {
      this.document.body.style.overflow = '';
    }
  }

  // ─── IntersectionObserver ──────────────────────────────────────────────────

  private setupIntersectionObserver(): void {
    const sectionIds = ['home', 'work', 'about', 'experience', 'contact'];

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.ngZone.run(() => {
              this.activeSection = entry.target.id;
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    // Wait for DOM
    setTimeout(() => {
      sectionIds.forEach(id => {
        const el = this.document.getElementById(id);
        if (el) this.observer.observe(el);
      });
    }, 200);
  }

  // ─── Keyboard ─────────────────────────────────────────────────────────────

  private onKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && this.isMobileMenuOpen) {
      this.ngZone.run(() => this.closeMobileMenu());
    }
  };

  // ─── Scroll navigation ─────────────────────────────────────────────────────

  scrollToSection(anchor: string): void {
    const el = this.document.querySelector(anchor);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToContact(): void {
    this.scrollToSection('.contact-section');
  }

  // ─── Mobile menu ──────────────────────────────────────────────────────────

  openMobileMenu(): void {
    this.isMobileMenuOpen = true;
    this.document.body.style.overflow = 'hidden';

    // Run animations after DOM renders
    setTimeout(() => {
      const overlay = this.mobileOverlayEl?.nativeElement;
      if (!overlay) return;

      const items = Array.from(
        overlay.querySelectorAll<HTMLElement>('[data-menu-item]')
      );
      this.animations.animateMobileMenuOpen(overlay, items);

      // Move focus into menu
      const firstLink = overlay.querySelector<HTMLElement>('[data-menu-item]');
      firstLink?.focus();
    }, 10);
  }

  closeMobileMenu(): void {
    const overlay = this.mobileOverlayEl?.nativeElement;

    if (overlay) {
      const items = Array.from(
        overlay.querySelectorAll<HTMLElement>('[data-menu-item]')
      );
      this.animations.animateMobileMenuClose(overlay, items, () => {
        this.ngZone.run(() => {
          this.isMobileMenuOpen = false;
          this.document.body.style.overflow = '';
          // Restore focus to hamburger
          const hamburger = this.document.getElementById('hamburger-btn');
          hamburger?.focus();
        });
      });
    } else {
      this.isMobileMenuOpen = false;
      this.document.body.style.overflow = '';
    }
  }

  onMobileNavItemClick(anchor: string): void {
    this.closeMobileMenu();
    // Small delay to let the close animation start before scrolling
    setTimeout(() => this.scrollToSection(anchor), 150);
  }

  // ─── Getters ──────────────────────────────────────────────────────────────

  get isHero(): boolean {
    return this.navbarState === 'hero';
  }

  get isScrolled(): boolean {
    return this.navbarState === 'scrolled';
  }
}
