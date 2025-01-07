import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationsService } from '../../../animations.service';
@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  lottieOptions: AnimationOptions = {
    path: '/assets/animation/dev.json', // Correct path
    loop: true, // Whether the animation should loop
    autoplay: true, // Whether the animation should start automatically
  };
  // Optional: Handle the animationCreated event
  onAnimationCreated(animationItem: AnimationItem): void {
    console.log('Animation created:', animationItem);
  }
  ngOnInit(): void {
    this.type(); // Start the typewriter effect
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Trigger "out" animation when navigation starts
        this.animations.pageTransitionOut('.page-content');
      }
      if (event instanceof NavigationEnd) {
        // Trigger "in" animation when navigation ends
        setTimeout(() => {
          this.animations.pageTransitionIn('.page-content');
        }, 100); // Small delay to allow the new page to load
      }
    });
  }
  
  redirectToMedia(name : string): void {
    switch (name) {
      case 'linkedin':
        window.open( 'https://www.linkedin.com/in/kamal-naim-014989310/');
        break;
        case 'github':
          window.open( 'https://github.com/NK01Dev');
          break;
          case 'x':
            window.open( 'https://twitter.com/');
        }
    // window.open('https://www.facebook.com', '_blank', 'noopener,noreferrer');
  }
  words: string[] = ["Full-Stack Developer","Mobile Developer"];
  displayText: string = '';
  private currentWordIndex: number = 0;
  private currentCharIndex: number = 0;
  private isDeleting: boolean = false;
  private type(): void {
    const currentWord = this.words[this.currentWordIndex];

    if (this.isDeleting) {
      this.displayText = currentWord.substring(0, this.currentCharIndex - 1);
      this.currentCharIndex--;
      if (this.currentCharIndex === 0) {
        this.isDeleting = false;
        this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
      }
    } else {
      this.displayText = currentWord.substring(0, this.currentCharIndex + 1);
      this.currentCharIndex++;
      if (this.currentCharIndex === currentWord.length) {
        this.isDeleting = true;
      }
    }

    setTimeout(() => this.type(), this.isDeleting ? 100 : 150);
  }
  constructor(private router: Router, private animations: AnimationsService) {}


}
