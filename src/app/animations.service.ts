import { Injectable } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {

  constructor() { }// Animation for page transitions
  // Animation for page transitions
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
}