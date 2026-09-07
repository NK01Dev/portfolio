import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PROJECTS_DATA } from '../../../data/projects.data';
import { Project } from '../../../models/project.interface';
import { SeoService } from '../../../services/seo.service';
import { AnalyticsService } from '../../analytics/analytics.service';

@Component({
  selector: 'app-project-detail',
  standalone: false,
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css',
})
export class ProjectDetailComponent implements OnInit {
  project: Project | null = null;
  otherProjects: Project[] = [];

  private readonly analytics = inject(AnalyticsService);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seoService: SeoService
  ) {}

  onGithubClick(): void {
    if (this.project) {
      this.analytics.trackProjectGithubClick(this.project.id);
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      const found = PROJECTS_DATA.find((p) => p.id === id);

      if (!found) {
        this.router.navigate(['/404']);
        return;
      }

      this.project = found;
      this.otherProjects = PROJECTS_DATA.filter((p) => p.id !== id);
      this.analytics.trackProjectView(found.id, found.title);

      const canonical = `https://kamalnaim.vercel.app/projects/${found.id}`;
      const title = `${found.title} Case Study | Kamal Naim`;
      const description =
        found.caseStudy?.summary ||
        `In-depth software engineering case study of ${found.title} built with ${found.technologies.join(
          ', '
        )} by Kamal Naim.`;

      const projectSchema = {
        '@type': 'SoftwareApplication',
        '@id': `${canonical}#software`,
        name: found.title,
        applicationCategory:
          found.type === 'mobile'
            ? 'MobileApplication'
            : found.type === 'desktop'
            ? 'DesktopApplication'
            : 'WebApplication',
        operatingSystem:
          found.type === 'mobile'
            ? 'Android, iOS'
            : found.type === 'desktop'
            ? 'Windows'
            : 'Cross-platform Web',
        author: {
          '@id': 'https://kamalnaim.vercel.app/#person',
        },
        description: description,
        url: canonical,
        downloadUrl: found.repositoryUrl,
        programmingLanguage: found.technologies,
      };

      this.seoService.updateSeo({
        title,
        description,
        canonicalUrl: canonical,
        ogImage: found.heroImage.startsWith('http')
          ? found.heroImage
          : `https://kamalnaim.vercel.app${found.heroImage}`,
        ogType: 'article',
        breadcrumbs: [
          { name: 'Home', url: 'https://kamalnaim.vercel.app/' },
          { name: 'Projects', url: 'https://kamalnaim.vercel.app/projects' },
          { name: found.title, url: canonical },
        ],
        jsonLd: projectSchema,
      });

      // Scroll to top on route change
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
