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

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  private gsapContext: gsap.Context | null = null;

  readonly capabilityItems: string[] = [
    'MOBILE',
    'WEB',
    'BACKEND',
    'DESKTOP',
    'INFRASTRUCTURE',
    'NETWORKING',
  ];

  readonly profilePillars: ProfilePillar[] = [
    {
      number: '01',
      titleKey: 'about.profile.software',
      items: [
        'about.profile.mobile',
        'about.profile.web',
        'about.profile.backend',
        'about.profile.desktop',
      ],
    },
    {
      number: '02',
      titleKey: 'about.profile.systems',
      items: [
        'about.profile.architecture',
        'about.profile.api',
        'about.profile.database',
        'about.profile.integration',
        'about.profile.maintainable',
      ],
    },
    {
      number: '03',
      titleKey: 'about.profile.infrastructure',
      items: [
        'about.profile.networking',
        'about.profile.switching',
        'about.profile.routing',
        'about.profile.winserver',
        'about.profile.linux',
        'about.profile.proxmox',
      ],
    },
    {
      number: '04',
      titleKey: 'about.profile.delivery',
      items: [
        'about.profile.docker',
        'about.profile.cicd',
        'about.profile.cloud',
        'about.profile.deployment',
        'about.profile.automation',
      ],
    },
  ];

  readonly infraNodes: InfraNode[] = [
    {
      id: 'network',
      labelKey: 'about.infrastructure.flow.network',
      sublabel: 'VLANs · Subnets · IPAM',
      icon: 'network',
    },
    {
      id: 'switching',
      labelKey: 'about.infrastructure.flow.switching',
      sublabel: 'Layer 2/3 · OSPF · BGP',
      icon: 'switch',
    },
    {
      id: 'servers',
      labelKey: 'about.infrastructure.flow.servers',
      sublabel: 'Ubuntu · Windows Server',
      icon: 'server',
    },
    {
      id: 'virtualization',
      labelKey: 'about.infrastructure.flow.virtualization',
      sublabel: 'Proxmox · LXC · KVM',
      icon: 'virtual',
    },
    {
      id: 'applications',
      labelKey: 'about.infrastructure.flow.applications',
      sublabel: 'Flutter · Angular · APIs',
      icon: 'app',
    },
  ];

  readonly techGroups: TechGroup[] = [
    {
      titleKey: 'about.stack.applications',
      label: 'APPLICATIONS',
      items: [
        { name: 'Flutter', iconPath: 'assets/icons/flutter-plain.svg' },
        { name: 'Dart', iconPath: 'assets/icons/dart-original.svg' },
        { name: 'Angular', iconPath: 'assets/icons/angular-icon.svg' },
        { name: 'TypeScript', iconPath: 'assets/icons/typescriptlang-icon.svg' },
        { name: 'React', svgType: 'react' },
        { name: 'Android', iconPath: 'assets/icons/android-official.svg' },
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
      titleKey: 'about.stack.infrastructure',
      label: 'INFRASTRUCTURE',
      items: [
        { name: 'Docker', svgType: 'docker' },
        { name: 'AWS', svgType: 'aws' },
        { name: 'Linux', svgType: 'linux' },
        { name: 'Ubuntu Server', iconPath: 'assets/icons/ubuntu-ar21.svg' },
        { name: 'Windows Server', svgType: 'network' },
        { name: 'Proxmox', svgType: 'network' },
      ],
    },
    {
      titleKey: 'about.stack.networking',
      label: 'NETWORKING',
      items: [
        { name: 'Switching', svgType: 'network' },
        { name: 'Routing', svgType: 'network' },
        { name: 'TCP/IP', svgType: 'network' },
        { name: 'Network Config', svgType: 'network' },
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

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!prefersReducedMotion) {
      this.initAnimations();
    }
  }

  scrollToWork(): void {
    this.smoothScroll.scrollTo('#work');
  }

  private initAnimations(): void {
    this.ngZone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger);

      const root = this.el.nativeElement;

      this.gsapContext = gsap.context(() => {
        // 1. SECTION INTRO & CAPABILITIES
        const introTl = gsap.timeline({
          scrollTrigger: {
            trigger: root.querySelector('#about-section'),
            start: 'top 85%',
            once: true,
          },
        });

        introTl
          .fromTo(
            root.querySelectorAll('.about-intro-reveal'),
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.06,
              ease: 'power2.out',
              clearProps: 'transform',
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
            '-=0.3'
          );

        // 2. ENGINEERING PROFILE SEQUENCE
        const profileEl = root.querySelector('#engineering-profile');
        if (profileEl) {
          gsap.fromTo(
            profileEl.querySelectorAll('.profile-pillar-reveal'),
            { opacity: 0, y: 26 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.08,
              ease: 'power2.out',
              clearProps: 'transform',
              scrollTrigger: {
                trigger: profileEl,
                start: 'top 82%',
                once: true,
              },
            }
          );
        }

        // 3. INFRASTRUCTURE & NETWORKS FLOW
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

          flowNodes.forEach((node, idx) => {
            flowTl.fromTo(
              node,
              { opacity: 0, y: 18 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out',
                clearProps: 'transform',
              }
            );

            if (flowLines[idx]) {
              flowTl.fromTo(
                flowLines[idx],
                { scaleX: 0, transformOrigin: 'left center' },
                { scaleX: 1, duration: 0.35, ease: 'power2.inOut' },
                '-=0.2'
              );
            }
          });
        }

        // 4. TECHNOLOGY GROUPS
        const techEl = root.querySelector('#tech-stack-section');
        if (techEl) {
          gsap.fromTo(
            techEl.querySelectorAll('.tech-group-card'),
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.06,
              ease: 'power2.out',
              clearProps: 'transform',
              scrollTrigger: {
                trigger: techEl,
                start: 'top 82%',
                once: true,
              },
            }
          );
        }

        // 5. ENGINEERING MINDSET
        const mindsetEl = root.querySelector('#mindset-section');
        if (mindsetEl) {
          gsap.fromTo(
            mindsetEl.querySelectorAll('.mindset-reveal'),
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.1,
              ease: 'power3.out',
              clearProps: 'transform',
              scrollTrigger: {
                trigger: mindsetEl,
                start: 'top 85%',
                once: true,
              },
            }
          );
        }

        // 6. PROOF STRIP
        const proofEl = root.querySelector('#proof-strip');
        if (proofEl) {
          gsap.fromTo(
            proofEl.querySelectorAll('.proof-item'),
            { opacity: 0, y: 14 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.08,
              ease: 'power2.out',
              clearProps: 'transform',
              scrollTrigger: {
                trigger: proofEl,
                start: 'top 88%',
                once: true,
              },
            }
          );
        }
      }, root);
    });
  }

  ngOnDestroy(): void {
    if (this.gsapContext) {
      this.gsapContext.revert();
      this.gsapContext = null;
    }
  }
}
