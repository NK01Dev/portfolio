import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SmoothScrollService } from '../../../services/smooth-scroll.service';

export interface EngineeringFocus {
  id: string;
  titleKey: string;
  descKey: string;
  tag: string;
  icon: 'mobile' | 'web' | 'backend' | 'desktop' | 'cloud' | 'ai';
}

export interface TechItem {
  name: string;
  iconPath?: string;
  svgType?: 'react' | 'nestjs' | 'spring' | 'postgres' | 'aws' | 'docker' | 'cicd';
}

export interface TechCategory {
  titleKey: string;
  label: string;
  items: TechItem[];
}

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  private scrollTriggerInstance: ScrollTrigger | null = null;

  readonly engineeringFocuses: EngineeringFocus[] = [
    {
      id: 'mobile',
      titleKey: 'about.focus.mobile',
      descKey: 'about.focus.mobile_desc',
      tag: 'iOS · Android · Flutter',
      icon: 'mobile',
    },
    {
      id: 'web',
      titleKey: 'about.focus.web',
      descKey: 'about.focus.web_desc',
      tag: 'Angular 19 · TypeScript · SPA',
      icon: 'web',
    },
    {
      id: 'backend',
      titleKey: 'about.focus.backend',
      descKey: 'about.focus.backend_desc',
      tag: 'Node.js · Express · REST',
      icon: 'backend',
    },
    {
      id: 'desktop',
      titleKey: 'about.focus.desktop',
      descKey: 'about.focus.desktop_desc',
      tag: 'Windows · macOS · SQLite',
      icon: 'desktop',
    },
    {
      id: 'cloud',
      titleKey: 'about.focus.cloud',
      descKey: 'about.focus.cloud_desc',
      tag: 'Docker · CI/CD · AWS',
      icon: 'cloud',
    },
    {
      id: 'ai',
      titleKey: 'about.focus.ai',
      descKey: 'about.focus.ai_desc',
      tag: 'Agents · Vector Search · APIs',
      icon: 'ai',
    },
  ];

  readonly techCategories: TechCategory[] = [
    {
      titleKey: 'about.stack.mobile',
      label: 'MOBILE',
      items: [
        { name: 'Flutter', iconPath: 'assets/icons/flutter-plain.svg' },
        { name: 'Dart', iconPath: 'assets/icons/dart-original.svg' },
        { name: 'Android', iconPath: 'assets/icons/android-official.svg' },
      ],
    },
    {
      titleKey: 'about.stack.web',
      label: 'WEB',
      items: [
        { name: 'Angular', iconPath: 'assets/icons/angular-icon.svg' },
        { name: 'TypeScript', iconPath: 'assets/icons/typescriptlang-icon.svg' },
        { name: 'React', svgType: 'react' },
      ],
    },
    {
      titleKey: 'about.stack.backend',
      label: 'BACKEND',
      items: [
        { name: 'Node.js', iconPath: 'assets/icons/nodejs-original-wordmark.svg' },
        { name: 'Express', iconPath: 'assets/icons/express-original-wordmark.svg' },
        { name: 'NestJS', svgType: 'nestjs' },
        { name: 'Spring Boot', svgType: 'spring' },
      ],
    },
    {
      titleKey: 'about.stack.data',
      label: 'DATA',
      items: [
        { name: 'PostgreSQL', svgType: 'postgres' },
        { name: 'MongoDB', iconPath: 'assets/icons/mongodb-plain.svg' },
        { name: 'SQLite / Drift', iconPath: 'assets/icons/sqlite-icon.svg' },
        { name: 'Supabase', iconPath: 'assets/icons/supabase-icon.svg' },
      ],
    },
    {
      titleKey: 'about.stack.cloud',
      label: 'CLOUD & DEVOPS',
      items: [
        { name: 'AWS', svgType: 'aws' },
        { name: 'Docker', svgType: 'docker' },
        { name: 'CI/CD', svgType: 'cicd' },
      ],
    },
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private el: ElementRef,
    private ngZone: NgZone,
    private smoothScroll: SmoothScrollService
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!prefersReducedMotion) {
      this.initEntranceAnimation();
    }
  }

  scrollToWork(): void {
    this.smoothScroll.scrollTo('#work');
  }

  private initEntranceAnimation(): void {
    this.ngZone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger);

      const sectionEl = this.el.nativeElement.querySelector('#about-section');
      if (!sectionEl) return;

      const revealElements = sectionEl.querySelectorAll('.about-reveal');
      if (!revealElements || revealElements.length === 0) return;

      this.scrollTriggerInstance = ScrollTrigger.create({
        trigger: sectionEl,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            revealElements,
            {
              opacity: 0,
              y: 22,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              stagger: 0.045,
              ease: 'power2.out',
              clearProps: 'transform',
            }
          );
        },
      });
    });
  }

  ngOnDestroy(): void {
    if (this.scrollTriggerInstance) {
      this.scrollTriggerInstance.kill();
      this.scrollTriggerInstance = null;
    }
  }
}
