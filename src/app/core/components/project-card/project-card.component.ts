import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { Project } from '../../../models/project.interface';
import { AnimationsService } from '../../../animations.service';
import { AnalyticsService } from '../../analytics/analytics.service';

@Component({
  selector: 'app-project-card',
  standalone: false,
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css',
})
export class ProjectCardComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() project!: Project;
  @Input() totalCount: string = '04';
  @Input() isLast: boolean = false;
  @Output() onNext = new EventEmitter<void>();
  @ViewChild('cardEl') cardEl!: ElementRef<HTMLElement>;

  private readonly analytics = inject(AnalyticsService);

  imageFailed = false;
  secondaryImageFailed = false;
  selectedScreenIndex = -1;
  private observer!: IntersectionObserver;
  private animated = false;

  constructor(private animations: AnimationsService) {}

  onCaseStudyClick(): void {
    this.analytics.trackProjectView(this.project.id, this.project.title);
  }

  onDemoClick(): void {
    this.analytics.trackProjectDemoClick(this.project.id);
  }

  onGithubClick(): void {
    this.analytics.trackProjectGithubClick(this.project.id);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setupEntranceAnimation();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  onImageError(): void {
    this.imageFailed = true;
  }

  get imageUrl(): string {
    return this.project?.heroImage || this.project?.image || '';
  }

  get secondaryImageUrl(): string {
    if (this.project?.screenshots && this.project.screenshots.length > 0) {
      return this.project.screenshots[0];
    }
    return '';
  }

  get activeMobileImageUrl(): string {
    if (
      this.selectedScreenIndex >= 0 &&
      this.project?.screenshots &&
      this.project.screenshots[this.selectedScreenIndex]
    ) {
      return this.project.screenshots[this.selectedScreenIndex];
    }
    return this.imageUrl;
  }

  get altText(): string {
    return (
      this.project?.imageAlt ||
      `${this.project?.title} ${this.project?.type} application preview interface`
    );
  }

  get repoUrl(): string | undefined {
    return this.project?.repositoryUrl || this.project?.github;
  }

  get caseUrl(): string | undefined {
    return this.project?.caseStudyUrl || this.project?.liveUrl;
  }

  get isInternalCaseUrl(): boolean {
    return !!this.caseUrl && this.caseUrl.startsWith('/');
  }

  get progressPercent(): number {
    const current = parseInt(this.project?.number || '1', 10);
    const total = parseInt(this.totalCount || '4', 10);
    if (!total || isNaN(total)) return 25;
    return Math.min(100, Math.max(10, Math.round((current / total) * 100)));
  }

  private setupEntranceAnimation(): void {
    const card = this.cardEl?.nativeElement;
    if (!card) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.animated) {
            this.animated = true;
            this.animations.animateProjectCard(card);
            this.observer.disconnect();
          }
        });
      },
      { rootMargin: '0px 0px -80px 0px', threshold: 0.1 }
    );

    this.observer.observe(card);
  }
}
