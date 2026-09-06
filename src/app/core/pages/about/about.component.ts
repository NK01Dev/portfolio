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
import { SmoothScrollService } from '../../../services/smooth-scroll.service';

export interface ProfilePillar {
  number: string;
  titleKey: string;
  items: string[];
}

export interface InfraNode {
  id: string;
  labelKey: string;
  sublabel: string;
  icon: string;
}

export interface TechItem {
  name: string;
  iconPath?: string;
  svgType?: 'react' | 'nestjs' | 'spring' | 'postgres' | 'aws' | 'docker' | 'linux' | 'network';
}

export interface TechGroup {
  titleKey: string;
  label: string;
  items: TechItem[];
}

export interface ScopeItem {
  number: string;
  categoryKey: string;
  descKey: string;
}

export interface AboutSubSection {
  id: string;
  label: string;
}

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('aboutHeader') aboutHeader!: ElementRef<HTMLElement>;

  private gsapContext: gsap.Context | null = null;
  private scrollTriggerInstances: ScrollTrigger[] = [];

  // ── Navigation state (mirrors Work section) ──────────────────────────
  readonly aboutSubSections: AboutSubSection[] = [
    { id: 'about-intro',       label: 'INTRODUCTION' },
    { id: 'infra-flow-section', label: 'INFRASTRUCTURE' },
    { id: 'tech-stack-section', label: 'TECH STACK' },
    { id: 'mindset-section',   label: 'ENGINEERING MINDSET' },
    { id: 'proof-strip',       label: 'PROOF' },
  ];

  currentSectionIndex = 0;
  sectionProgress = 0;

  get currentSectionFormatted(): string {
    const n = this.currentSectionIndex + 1;
    return n < 10 ? `0${n}` : `${n}`;
  }

  get totalSectionsFormatted(): string {
    const n = this.aboutSubSections.length;
    return n < 10 ? `0${n}` : `${n}`;
  }

  get activeSectionLabel(): string {
    return this.aboutSubSections[this.currentSectionIndex]?.label ?? '';
  }

  // ── Data ──────────────────────────────────────────────────────────────
  readonly scopeItems: ScopeItem[] = [
    { number: '01', categoryKey: 'about.profile.software',       descKey: 'about.scope.software_desc' },
    { number: '02', categoryKey: 'about.profile.systems',        descKey: 'about.scope.systems_desc' },
    { number: '03', categoryKey: 'about.profile.infrastructure', descKey: 'about.scope.infra_desc' },
    { number: '04', categoryKey: 'about.profile.delivery',       descKey: 'about.scope.delivery_desc' },
  ];

  readonly capabilityItems: string[] = [
    'MOBILE', 'WEB', 'BACKEND', 'DESKTOP', 'INFRASTRUCTURE', 'NETWORKING',
  ];

  readonly profilePillars: ProfilePillar[] = [
    {
      number: '01',
      titleKey: 'about.profile.software',
      items: ['about.profile.mobile', 'about.profile.web', 'about.profile.backend', 'about.profile.desktop'],
    },
    {
      number: '02',
      titleKey: 'about.profile.systems',
      items: ['about.profile.architecture', 'about.profile.api', 'about.profile.database', 'about.profile.integration', 'about.profile.maintainable'],
    },
    {
      number: '03',
      titleKey: 'about.profile.infrastructure',
      items: ['about.profile.networking', 'about.profile.switching', 'about.profile.routing', 'about.profile.winserver', 'about.profile.linux', 'about.profile.proxmox'],
    },
    {
      number: '04',
      titleKey: 'about.profile.delivery',
      items: ['about.profile.docker', 'about.profile.cicd', 'about.profile.cloud', 'about.profile.deployment', 'about.profile.automation'],
    },
  ];

  readonly infraNodes: InfraNode[] = [
    { id: 'network',        labelKey: 'about.infrastructure.flow.network',        sublabel: 'VLANs · Subnets · IPAM',    icon: 'network' },
    { id: 'switching',      labelKey: 'about.infrastructure.flow.switching',      sublabel: 'Layer 2/3 · OSPF · BGP',    icon: 'switch'  },
    { id: 'servers',        labelKey: 'about.infrastructure.flow.servers',        sublabel: 'Ubuntu · Windows Server',   icon: 'server'  },
    { id: 'virtualization', labelKey: 'about.infrastructure.flow.virtualization', sublabel: 'Proxmox · LXC · KVM',       icon: 'virtual' },
    { id: 'applications',   labelKey: 'about.infrastructure.flow.applications',   sublabel: 'Flutter · Angular · APIs',  icon: 'app'     },
  ];

  readonly techGroups: TechGroup[] = [
    {
      titleKey: 'about.stack.applications',
      label: 'APPLICATIONS',
      items: [
        { name: 'Flutter',     iconPath: 'assets/icons/flutter-plain.svg' },
        { name: 'Dart',        iconPath: 'assets/icons/dart-original.svg' },
        { name: 'Angular',     iconPath: 'assets/icons/angular-icon.svg' },
        { name: 'TypeScript',  iconPath: 'assets/icons/typescriptlang-icon.svg' },
        { name: 'React',       svgType: 'react' },
        { name: 'Android',     iconPath: 'assets/icons/android-official.svg' },
      ],
    },
    {
      titleKey: 'about.stack.backend',
      label: 'BACKEND',
      items: [
        { name: 'Node.js',     iconPath: 'assets/icons/nodejs-original-wordmark.svg' },
        { name: 'Express',     iconPath: 'assets/icons/express-original-wordmark.svg' },
        { name: 'NestJS',      svgType: 'nestjs' },
        { name: 'Spring Boot', svgType: 'spring' },
      ],
    },
    {
      titleKey: 'about.stack.data',
      label: 'DATA',
      items: [
        { name: 'PostgreSQL',      svgType: 'postgres' },
        { name: 'MongoDB',         iconPath: 'assets/icons/mongodb-plain.svg' },
        { name: 'SQLite / Drift',  iconPath: 'assets/icons/sqlite-icon.svg' },
        { name: 'Supabase',        iconPath: 'assets/icons/supabase-icon.svg' },
      ],
    },
    {
      titleKey: 'about.stack.infrastructure',
      label: 'INFRASTRUCTURE',
      items: [
        { name: 'Docker',         svgType: 'docker' },
        { name: 'AWS',            svgType: 'aws' },
        { name: 'Linux',          svgType: 'linux' },
        { name: 'Ubuntu Server',  iconPath: 'assets/icons/ubuntu-ar21.svg' },
        { name: 'Windows Server', svgType: 'network' },
        { name: 'Proxmox',        svgType: 'network' },
      ],
    },
    {
      titleKey: 'about.stack.networking',
      label: 'NETWORKING',
      items: [
        { name: 'Switching',       svgType: 'network' },
        { name: 'Routing',         svgType: 'network' },
        { name: 'TCP/IP',          svgType: 'network' },
        { name: 'Network Config',  svgType: 'network' },
      ],
    },
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private el: ElementRef<HTMLElement>,
    private ngZone: NgZone,
    private smoothScroll: SmoothScrollService
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.initScrollNavigation();

    if (!prefersReducedMotion) {
      this.initAnimations();
    }
  }

  // ── Keyboard navigation ───────────────────────────────────────────────
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const root = this.el.nativeElement;
    if (!root) return;
    const rect = root.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!isInView) return;

    // Only handle arrow keys when focused within About section
    const focused = document.activeElement;
    const insideAbout = root.contains(focused as Node);
    if (!insideAbout) return;

    if (event.key === 'ArrowDown') {
      this.nextSection();
    } else if (event.key === 'ArrowUp') {
      this.prevSection();
    }
  }

  // ── Navigation public methods ─────────────────────────────────────────
  nextSection(): void {
    if (this.currentSectionIndex < this.aboutSubSections.length - 1) {
      this.scrollToSection(this.currentSectionIndex + 1);
    }
  }

  prevSection(): void {
    if (this.currentSectionIndex > 0) {
      this.scrollToSection(this.currentSectionIndex - 1);
    }
  }

  scrollToSection(index: number): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const clamped = Math.max(0, Math.min(index, this.aboutSubSections.length - 1));
    const sectionId = this.aboutSubSections[clamped].id;
    const sectionEl = this.el.nativeElement.querySelector(`#${sectionId}`) as HTMLElement;

    if (!sectionEl) return;

    // Offset for sticky header (about nav header ~60px + navbar ~70px)
    const offset = 140;
    const top = sectionEl.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top, behavior: 'smooth' });
  }

  scrollToWork(): void {
    this.smoothScroll.scrollTo('#work');
  }

  // ── Scroll navigation tracking (IntersectionObserver) ─────────────────
  private intersectionObserver: IntersectionObserver | null = null;

  private initScrollNavigation(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const root = this.el.nativeElement;
    const total = this.aboutSubSections.length;

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const idx = this.aboutSubSections.findIndex((s) => s.id === id);
            if (idx !== -1) {
              this.ngZone.run(() => {
                this.currentSectionIndex = idx;
                this.sectionProgress = Math.round(((idx + 1) / total) * 100);
              });
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0,
      }
    );

    this.aboutSubSections.forEach((section) => {
      const el = root.querySelector(`#${section.id}`);
      if (el) {
        this.intersectionObserver!.observe(el);
      }
    });
  }

  // ── GSAP Animations ───────────────────────────────────────────────────
  private initAnimations(): void {
    this.ngZone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger);

      const root = this.el.nativeElement;

      this.gsapContext = gsap.context(() => {

        // ── 1. SECTION INTRO ─────────────────────────────────────────────
        const introTl = gsap.timeline({
          scrollTrigger: {
            trigger: root.querySelector('#about-intro'),
            start: 'top 85%',
            once: true,
          },
        });

        introTl
          .fromTo(
            root.querySelectorAll('.about-intro-reveal'),
            { opacity: 0, y: 28, clipPath: 'inset(0 0 100% 0)' },
            {
              opacity: 1,
              y: 0,
              clipPath: 'inset(0 0 0% 0)',
              duration: 0.7,
              stagger: 0.08,
              ease: 'power3.out',
              clearProps: 'clipPath,transform',
            }
          )
          .fromTo(
            root.querySelectorAll('.about-cap-item'),
            { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              stagger: 0.04,
              ease: 'power2.out',
              clearProps: 'transform',
            },
            '-=0.35'
          );

        // Scope card — transaction slide-in from right
        gsap.fromTo(
          root.querySelector('.scope-card-reveal'),
          { opacity: 0, x: 40, scale: 0.97 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.75,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: root.querySelector('.scope-card-reveal'),
              start: 'top 85%',
              once: true,
            },
          }
        );

        // Scope rows — stagger from right
        gsap.fromTo(
          root.querySelectorAll('.scope-row-reveal'),
          { opacity: 0, x: 16 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.07,
            ease: 'power2.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: root.querySelector('.scope-card-reveal'),
              start: 'top 82%',
              once: true,
            },
          }
        );

        // ── 2. INFRASTRUCTURE FLOW ────────────────────────────────────────
        const infraEl = root.querySelector('#infra-flow-section');
        if (infraEl) {
          const flowNodes = infraEl.querySelectorAll('.infra-node');
          const flowLines = infraEl.querySelectorAll('.infra-line-draw');

          const flowTl = gsap.timeline({
            scrollTrigger: {
              trigger: infraEl,
              start: 'top 80%',
              once: true,
            },
          });

          // Section header reveal
          flowTl.fromTo(
            infraEl.querySelector('.flex.items-center.justify-between'),
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', clearProps: 'transform' }
          );

          flowNodes.forEach((node, idx) => {
            flowTl.fromTo(
              node,
              { opacity: 0, y: 22, scale: 0.95 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                ease: 'back.out(1.4)',
                clearProps: 'transform',
              },
              idx === 0 ? '-=0.2' : '-=0.3'
            );

            if (flowLines[idx]) {
              flowTl.fromTo(
                flowLines[idx],
                { scaleX: 0, transformOrigin: 'left center' },
                { scaleX: 1, duration: 0.3, ease: 'power2.inOut' },
                '-=0.15'
              );
            }
          });
        }

        // ── 3. TECH GROUP CARDS — transaction flip-reveal ─────────────────
        const techEl = root.querySelector('#tech-stack-section');
        if (techEl) {
          // Header
          gsap.fromTo(
            techEl.querySelector('.flex.items-center.justify-between'),
            { opacity: 0, y: 10 },
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              ease: 'power2.out',
              clearProps: 'transform',
              scrollTrigger: {
                trigger: techEl,
                start: 'top 85%',
                once: true,
              },
            }
          );

          // Cards — staggered clip-path transaction reveal
          const cards = techEl.querySelectorAll('.tech-group-card');
          cards.forEach((card, idx) => {
            gsap.fromTo(
              card,
              {
                opacity: 0,
                y: 32,
                scale: 0.96,
                clipPath: 'inset(8px 8px 100% 8px round 16px)',
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                clipPath: 'inset(0px 0px 0% 0px round 16px)',
                duration: 0.65,
                ease: 'power3.out',
                clearProps: 'clipPath,transform',
                delay: idx * 0.07,
                scrollTrigger: {
                  trigger: card,
                  start: 'top 88%',
                  once: true,
                },
              }
            );
          });
        }

        // ── 4. ENGINEERING MINDSET ────────────────────────────────────────
        const mindsetEl = root.querySelector('#mindset-section');
        if (mindsetEl) {
          const mindsetItems = mindsetEl.querySelectorAll('.mindset-reveal');
          mindsetItems.forEach((item, idx) => {
            gsap.fromTo(
              item,
              { opacity: 0, y: 24, clipPath: 'inset(0 0 100% 0)' },
              {
                opacity: 1,
                y: 0,
                clipPath: 'inset(0 0 0% 0)',
                duration: 0.72,
                ease: 'power3.out',
                clearProps: 'clipPath,transform',
                delay: idx * 0.1,
                scrollTrigger: {
                  trigger: mindsetEl,
                  start: 'top 85%',
                  once: true,
                },
              }
            );
          });
        }

        // ── 5. PROOF STRIP — premium transaction card entrance ───────────
        const proofEl = root.querySelector('#proof-strip');
        if (proofEl) {
          const proofCards = proofEl.querySelectorAll('.proof-card');

          proofCards.forEach((card, idx) => {
            // Staggered: card slides up + scale from 0.9, border glow on entry
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                once: true,
              },
            });

            tl.fromTo(
              card,
              {
                opacity: 0,
                y: 40,
                scale: 0.92,
                clipPath: 'inset(12px 12px 100% 12px round 16px)',
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                clipPath: 'inset(0px 0px 0% 0px round 16px)',
                duration: 0.7,
                ease: 'power3.out',
                clearProps: 'clipPath,transform',
                delay: idx * 0.12,
              }
            );

            // Counter number count-up for first card (38+)
            if (idx === 0) {
              const counterEl = card.querySelector('.proof-counter');
              if (counterEl) {
                const counter = { val: 0 };
                tl.to(
                  counter,
                  {
                    val: 38,
                    duration: 1.2,
                    ease: 'power2.out',
                    delay: idx * 0.12,
                    onUpdate: () => {
                      counterEl.textContent = Math.round(counter.val) + '+';
                    },
                  },
                  0
                );
              }
            }
          });
        }

      }, root);
    });
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }

    if (this.gsapContext) {
      this.gsapContext.revert();
      this.gsapContext = null;
    }
  }
}
