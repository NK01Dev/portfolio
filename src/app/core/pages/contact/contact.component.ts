import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, NgZone, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SeoService } from '../../../services/seo.service';
import { AnalyticsService } from '../../analytics/analytics.service';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly email = 'kamal.nk.naim@gmail.com';
  readonly linkedinUrl = 'https://www.linkedin.com/in/kamal-naim-014989310/';
  readonly githubUrl = 'https://github.com/NK01Dev';
  readonly phone = '+212 670 572 967';
  readonly phoneUrl = 'tel:+212670572967';

  copied = false;
  private copyTimeout: ReturnType<typeof setTimeout> | null = null;
  private gsapContext: gsap.Context | null = null;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);
  private readonly el = inject(ElementRef);
  private readonly seoService = inject(SeoService);
  private readonly analytics = inject(AnalyticsService);

  ngOnInit(): void {
    this.seoService.updateSeo({
      title: 'Contact Kamal Naim — Software Engineer',
      description:
        'Get in touch with Kamal Naim for software engineering opportunities, technical architecture, full-stack systems, and engineering collaboration.',
      canonicalUrl: 'https://kamalnaim.vercel.app/contact',
      breadcrumbs: [
        { name: 'Home', url: 'https://kamalnaim.vercel.app/' },
        { name: 'Contact', url: 'https://kamalnaim.vercel.app/contact' },
      ],
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.initGsapAnimations();
  }

  ngOnDestroy(): void {
    if (this.copyTimeout) {
      clearTimeout(this.copyTimeout);
      this.copyTimeout = null;
    }

    if (this.gsapContext) {
      this.gsapContext.revert();
      this.gsapContext = null;
    }
  }

  private initGsapAnimations(): void {
    this.ngZone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger);

      const root = this.el.nativeElement;

      this.gsapContext = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.querySelector('#contact-section'),
            start: 'top 82%',
            once: true,
          },
        });

        // Specific GSAP sequence matching design specification
        tl.fromTo(
          root.querySelector('.contact-eyebrow'),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', clearProps: 'transform' }
        )
          .fromTo(
            root.querySelector('.contact-heading'),
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', clearProps: 'transform' },
            '-=0.45'
          )
          .fromTo(
            root.querySelector('.contact-description'),
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', clearProps: 'transform' },
            '-=0.45'
          )
          .fromTo(
            root.querySelector('.contact-cta'),
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', clearProps: 'transform' },
            '-=0.4'
          )
          .fromTo(
            root.querySelectorAll('.contact-link-item'),
            { opacity: 0, x: 12 },
            { opacity: 1, x: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', clearProps: 'transform' },
            '-=0.45'
          );
      }, root);
    });
  }

  copyEmail(): void {
    if (isPlatformBrowser(this.platformId) && navigator.clipboard) {
      navigator.clipboard.writeText(this.email).then(() => {
        this.copied = true;
        this.analytics.trackEmailClick();

        if (this.copyTimeout) {
          clearTimeout(this.copyTimeout);
        }

        this.copyTimeout = setTimeout(() => {
          this.copied = false;
        }, 2200);
      }).catch(() => {
        // Fallback if clipboard API is restricted
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 2200);
      });
    }
  }

  onEmailClick(): void {
    this.analytics.trackEmailClick();
  }

  onSocialClick(platform: string): void {
    this.analytics.trackSocialClick(platform);
  }
}