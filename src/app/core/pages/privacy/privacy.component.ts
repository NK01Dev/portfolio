import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-privacy',
  standalone: false,
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.css'
})
export class PrivacyComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateSeo({
      title: 'Privacy Policy — Kamal Naim Portfolio',
      description:
        'Privacy Policy for the personal portfolio of Kamal Naim. Explains usage of Google Analytics 4, Microsoft Clarity, and data protection practices.',
      canonicalUrl: 'https://kamalnaim.vercel.app/privacy',
      breadcrumbs: [
        { name: 'Home', url: 'https://kamalnaim.vercel.app/' },
        { name: 'Privacy Policy', url: 'https://kamalnaim.vercel.app/privacy' }
      ]
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
