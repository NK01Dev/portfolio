import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-not-found',
  standalone: false,
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateSeo({
      title: '404: Page Not Found | Kamal Naim',
      description:
        'The requested page could not be found. Explore Kamal Naim software engineering portfolio, project case studies, and resume.',
      canonicalUrl: 'https://kamalnaim.vercel.app/404',
      noIndex: true,
    });
  }
}
