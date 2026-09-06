import { Injectable } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {

  constructor() {}

  // Page Transitions

  pageTransitionIn(element: string) {
    anime({
      targets: element,
      translateX: [-1000, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutExpo',
      complete: (anim: any) => {
        anim.animatables?.forEach((a: any) => {
          if (a?.target?.style) {
            (a.target as HTMLElement).style.transform = '';
          }
        });
      }
    });
  }

  pageTransitionOut(element: string) {
    anime({
      targets: element,
      translateX: [0, 1000],
      opacity: [1, 0],
      duration: 1000,
      easing: 'easeOutExpo',
    });
  }

  // Navbar Animations

  /** Animate navbar entrance on page load */
  animateNavbarEnter(element: HTMLElement): void {
    anime({
      targets: element,
      opacity: [0, 1],
      translateY: [-15, 0],
      duration: 400,
      easing: 'easeOutQuart',
    });
  }

  /**
   * Animate side drawer opening.
   * CSS handles the panel slide-in; Anime.js staggers the nav items.
   */
  animateMobileMenuOpen(overlay: HTMLElement, items: HTMLElement[]): void {
    if (items.length) {
      anime({
        targets: items,
        opacity: [0, 1],
        translateX: [24, 0],
        delay: anime.stagger(55, { start: 120 }),
        duration: 320,
        easing: 'easeOutQuart',
      });
    }
  }

  /**
   * Animate side drawer closing.
   * Items fade out then callback fires to destroy the component.
   */
  animateMobileMenuClose(overlay: HTMLElement, items: HTMLElement[], onComplete: () => void): void {
    if (items.length) {
      anime({
        targets: items,
        opacity: [1, 0],
        translateX: [0, 16],
        delay: anime.stagger(25),
        duration: 180,
        easing: 'easeInQuart',
        complete: onComplete,
      });
    } else {
      onComplete();
    }
  }

  /**
   * Animate a project card entrance.
   * Staggers text items (number, category, title, description, tags, actions)
   * and separately animates the image visual with a scale effect.
   * Respects prefers-reduced-motion — if the user prefers reduced motion,
   * items are made visible immediately without animation.
   */
  animateProjectCard(cardEl: HTMLElement): void {
    const reducedMotion = typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

    const textItems = Array.from(
      cardEl.querySelectorAll<HTMLElement>('.anim-item')
    );
    const imgItem = cardEl.querySelector<HTMLElement>('.anim-img');

    if (reducedMotion) {
      // Make everything visible immediately
      textItems.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      if (imgItem) {
        imgItem.style.opacity = '1';
        imgItem.style.transform = 'none';
      }
      return;
    }

    // Stagger text content items
    if (textItems.length) {
      anime({
        targets: textItems,
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(60, { start: 0 }),
        duration: 600,
        easing: 'easeOutQuart',
      });
    }

    // Image: fade + subtle scale — slight delay
    if (imgItem) {
      anime({
        targets: imgItem,
        opacity: [0, 1],
        scale: [0.97, 1],
        delay: 100,
        duration: 700,
        easing: 'easeOutQuart',
      });
    }
  }

  /**
   * Initialize ScrollTrigger entrance and exit animations for titles, headings, and texts.
   * Elements smoothly show up when entering the viewport, and gracefully disappear when scrolled past.
   */
  initScrollTextAnimations(): ScrollTrigger[] {
    if (typeof window === 'undefined') return [];

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return [];

    gsap.registerPlugin(ScrollTrigger);

    const triggers: ScrollTrigger[] = [];

    // Target major headings, titles, subtitles, and section paragraphs
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(
        '.about-section h1, .about-section h2, .about-section p, .experience-section h1, .experience-section h2, #contact-section h2, #contact-section p, .scroll-reveal-text'
      )
    );

    elements.forEach((el) => {
      const tween = gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            end: 'bottom 12%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      if (tween.scrollTrigger) {
        triggers.push(tween.scrollTrigger);
      }
    });

    return triggers;
  }
}
