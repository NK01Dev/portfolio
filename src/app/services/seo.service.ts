import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

export interface SeoConfig {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  noIndex?: boolean;
  breadcrumbs?: Array<{ name: string; url: string }>;
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly defaultBaseUrl = 'https://kamalnaim.vercel.app';
  private readonly defaultImage = 'https://kamalnaim.vercel.app/assets/images/og-preview.jpg';
  private readonly siteName = 'Kamal Naim Portfolio';

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  updateSeo(config: SeoConfig): void {
    // 1. Title
    const fullTitle = config.title.includes('Kamal Naim')
      ? config.title
      : `${config.title} | Kamal Naim — Software Engineer`;
    this.titleService.setTitle(fullTitle);

    // 2. Meta description & robots
    this.metaService.updateTag({ name: 'description', content: config.description });
    this.metaService.updateTag({
      name: 'robots',
      content: config.noIndex ? 'noindex, nofollow' : 'index, follow',
    });

    const canonical = config.canonicalUrl || this.defaultBaseUrl;

    // 3. Update Canonical Tag
    this.updateCanonicalUrl(canonical);

    // 4. OpenGraph Tags
    this.metaService.updateTag({ property: 'og:title', content: fullTitle });
    this.metaService.updateTag({ property: 'og:description', content: config.description });
    this.metaService.updateTag({ property: 'og:url', content: canonical });
    this.metaService.updateTag({ property: 'og:type', content: config.ogType || 'website' });
    this.metaService.updateTag({ property: 'og:image', content: config.ogImage || this.defaultImage });
    this.metaService.updateTag({ property: 'og:site_name', content: this.siteName });
    this.metaService.updateTag({ property: 'og:locale', content: 'en_US' });

    // 5. Twitter / X Cards
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: fullTitle });
    this.metaService.updateTag({ name: 'twitter:description', content: config.description });
    this.metaService.updateTag({ name: 'twitter:image', content: config.ogImage || this.defaultImage });

    // 6. JSON-LD Graph Injection
    this.updateJsonLd(config);
  }

  private updateCanonicalUrl(url: string): void {
    let link: HTMLLinkElement | null = this.document.querySelector("link[rel='canonical']");
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private updateJsonLd(config: SeoConfig): void {
    const scriptId = 'schema-dynamic-jsonld';
    let script = this.document.getElementById(scriptId) as HTMLScriptElement | null;

    const basePersonEntity = {
      '@type': 'Person',
      '@id': `${this.defaultBaseUrl}/#person`,
      'name': 'Kamal Naim',
      'jobTitle': 'Software Engineer & Cross-Platform Developer',
      'url': `${this.defaultBaseUrl}/`,
      'email': 'kamal.nk.naim@gmail.com',
      'telephone': '+212670572967',
      'address': {
        '@type': 'PostalAddress',
        'addressCountry': 'MA',
        'addressLocality': 'Morocco',
      },
      'sameAs': [
        'https://github.com/NK01Dev',
        'https://www.linkedin.com/in/kamal-naim-014989310/',
      ],
      'alumniOf': [
        {
          '@type': 'EducationalOrganization',
          'name': 'Ecole Nationale des Sciences Appliquées (ENSA)',
          'description': 'Master Degree in Software Engineering and Information Systems Management (ILMSI)',
        },
        {
          '@type': 'EducationalOrganization',
          'name': 'Faculté des Sciences de Kenitra',
          'description': 'Bachelor Degree in Information Systems and Software for Enterprise Systems',
        },
      ],
      'hasCredential': [
        {
          '@type': 'EducationalOccupationalCredential',
          'name': 'DevOps Development Program — Talent 4 Startups',
          'credentialCategory': 'Professional Certification',
          'recognizedBy': {
            '@type': 'Organization',
            'name': 'Simplon / Digital Africa',
          },
          'description': "Appliquer les méthodes et outils de développement d'application dans une organisation DevOps",
        },
      ],
      'knowsAbout': [
        'Flutter',
        'Dart',
        'Angular',
        'TypeScript',
        'Node.js',
        'Express',
        'Clean Architecture',
        'Docker',
        'CI/CD',
        'Linux',
        'SQLite & Drift',
        'Isar Database',
        'MongoDB',
        'Networking & IT Infrastructure',
        'Cross-Platform Engineering',
      ],
    };

    const baseWebSiteEntity = {
      '@type': 'WebSite',
      '@id': `${this.defaultBaseUrl}/#website`,
      'url': `${this.defaultBaseUrl}/`,
      'name': 'Kamal Naim Portfolio',
      'description': 'Official engineering portfolio, technical case studies, and resume of Kamal Naim.',
      'publisher': {
        '@id': `${this.defaultBaseUrl}/#person`,
      },
      'inLanguage': ['en', 'fr'],
    };

    const graphItems: any[] = [basePersonEntity, baseWebSiteEntity];

    // Add BreadcrumbList if provided
    if (config.breadcrumbs && config.breadcrumbs.length > 0) {
      graphItems.push({
        '@type': 'BreadcrumbList',
        '@id': `${config.canonicalUrl || this.defaultBaseUrl}/#breadcrumb`,
        'itemListElement': config.breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          'position': idx + 1,
          'name': crumb.name,
          'item': crumb.url,
        })),
      });
    }

    // Add custom entity from config if provided
    if (config.jsonLd) {
      if (Array.isArray(config.jsonLd)) {
        graphItems.push(...config.jsonLd);
      } else {
        graphItems.push(config.jsonLd);
      }
    }

    const fullGraph = {
      '@context': 'https://schema.org',
      '@graph': graphItems,
    };

    if (!script) {
      script = this.document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }
    script.text = JSON.stringify(fullGraph, null, 2);
  }
}
