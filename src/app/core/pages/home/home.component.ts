import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
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

}
