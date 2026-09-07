import {
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-scroll-progress-bar',
  standalone: false,
  template: `
    <div
      #barEl
      class="scroll-progress-bar"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin="0"
      aria-valuemax="100"
      [attr.aria-valuenow]="progress"
    ></div>
  `,
  styles: [`
    .scroll-progress-bar {
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      width: 0%;
      z-index: 9999;
      background: linear-gradient(90deg, #7C3AED 0%, #A855F7 50%, #C084FC 100%);
      transform-origin: left center;
      will-change: width;
      transition: width 0.05s linear;
      box-shadow: 0 0 8px rgba(124, 58, 237, 0.6), 0 0 20px rgba(168, 85, 247, 0.3);
    }
  `]
})
export class ScrollProgressBarComponent implements OnInit, OnDestroy {
  @ViewChild('barEl') barEl!: ElementRef<HTMLDivElement>;
  progress = 0;

  private scrollHandler!: () => void;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.scrollHandler = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        // Direct DOM update — no Angular CD needed for perf
        if (this.barEl?.nativeElement) {
          this.barEl.nativeElement.style.width = `${pct.toFixed(2)}%`;
          this.barEl.nativeElement.setAttribute('aria-valuenow', pct.toFixed(0));
        }
      };

      window.addEventListener('scroll', this.scrollHandler, { passive: true });
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollHandler);
  }
}
