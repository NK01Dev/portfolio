import { Injectable } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';

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
}
