import {  Component, ElementRef, AfterViewInit  } from '@angular/core';
import { IconLoaderService } from '../../../services/icon-loader.service';
import anime from 'animejs/lib/anime.es.js';
import { Card } from '../../../models/card.interface';


@Component({
  selector: 'app-about',
  standalone: false,
  
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})

export class AboutComponent implements AfterViewInit   {
  icons: string[] = [];

  cards: Card[]  = [
    { title: 'Java', svg: 'assets/icons/java-icon.svg' },
    { title: 'JavaScript', svg: 'assets/icons/javascript-icon.svg' },
    { title: 'TypeScript', svg: 'assets/icons/typescriptlang-icon.svg' },
    { title: 'Dart', svg: 'assets/icons/dart-original.svg' },
    { title: 'HTML5', svg: 'assets/icons/html5-original.svg' },
    { title: 'CSS3', svg: 'assets/icons/css3-plain.svg' },
    { title: 'SQLite', svg: 'assets/icons/sqlite-icon.svg' },
    { title: 'MySQL', svg: 'assets/icons/mysql-official.svg' },
    { title: 'MongoDB', svg: 'assets/icons/mongodb-plain.svg' },
    { title: 'Supabase', svg: 'assets/icons/supabase-icon.svg' },
    { title: 'Firebase', svg: 'assets/icons/firebase-icon.svg' },
    { title: 'Auth0', svg: 'assets/icons/auth0-icon.svg' },

    { title: 'Flutter', svg: 'assets/icons/flutter-plain.svg' },
    { title: 'Android ', svg: 'assets/icons/android-official.svg' },
    { title: 'Angular', svg: 'assets/icons/angular-icon.svg' },
    { title: 'Nodejs', svg: 'assets/icons/nodejs-original-wordmark.svg' },
    { title: 'Express.js', svg: 'assets/icons/express-original-wordmark.svg' },
    { title: 'Figma', svg: 'assets/icons/figma-icon.svg' },



  ];
  constructor(private iconLoader: IconLoaderService,private el: ElementRef) {}
  ngAfterViewInit(): void {
    // this.randomValues();
    this.startAnimation();  }


    startAnimation(): void {
      anime({
        targets: '.animate-card',
        translateX: [
          { value: anime.random(-20, 20), duration: 1200, easing: 'easeInOutSine' },
          { value: 0, duration: 1200, easing: 'easeInOutSine' }
        ],
        translateY: [
          { value: anime.random(-10, 10), duration: 1200, easing: 'easeInOutSine' },
          { value: 0, duration: 1200, easing: 'easeInOutSine' }
        ],
        scale: [
          { value: 1.05, duration: 600, easing: 'easeInOutSine' },
          { value: 1, duration: 600, easing: 'easeInOutSine' }
        ],
        rotate: [
          { value: anime.random(-2, 2), duration: 1200, easing: 'easeInOutSine' },
          { value: 0, duration: 1200, easing: 'easeInOutSine' }
        ],
        opacity: {
          value: [0.8, 1], // Fade in and out slightly
          duration: 1200,
          easing: 'linear'
        },
        delay: anime.stagger(150, { start: 500 }), // Staggered start with a base delay
        loop: true, // Loop the animation indefinitely
        easing: 'easeInOutQuad'
      });
    } 
 
  //  randomValues():void {
  //   anime({
  //     targets: '.random-demo .el',
  //     translateX: function() {
  //       return anime.random(0, 270);
  //     },
  //     easing: 'easeInOutQuad',
  //     duration: 750,
  //     complete: () => this.randomValues(), // Recurse to repeat the animation
  //   });
  // }

}
