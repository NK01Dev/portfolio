import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PageScrollService } from 'ngx-page-scroll-core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent  implements OnInit {
  sections: string[] = ['home-section', 'about-section', 'resume-section', 'services-section', 'contact-section'];
  activeSection: string = 'home-section';
  ngOnInit() {
    // Initial check for active section
    this.checkActiveSection();
  }
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.checkActiveSection();
  }
  private checkActiveSection() {
    const scrollPosition = window.scrollY;

    this.sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetTop = element.offsetTop - 100; // Adjust offset as needed
        const offsetBottom = offsetTop + element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          this.activeSection = sectionId;
        }
      }
    });
  }
  siteLanguage = 'English';
  languageList = [
    { code: 'en', label: 'English' },
    { code: 'de', label: 'Deutsch' },
  ];
  isMenuOpen = false;
  constructor(private router: Router, private pageScrollService: PageScrollService,private translate: TranslateService
    ,@Inject(DOCUMENT) private document: any) {}
    scrollToSection(sectionClass: string): void {
      this.pageScrollService.scroll({
        document: this.document,
        scrollTarget: `.${sectionClass}`,
        duration: 800, // Smooth scroll duration in milliseconds
      });


      
      this.closeMenu(); 

    }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
  navigateTo(route: string, fragment?: string): void {
    this.router.navigate([route], { fragment }).then(() => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          this.activeSection = fragment;
                }
      }
    });
  }
  changeSiteLanguage(localeCode: string): void {
    const selectedLanguage = this.languageList
      .find((language) => language.code === localeCode)
      ?.label.toString();
    if (selectedLanguage) {
      this.siteLanguage = selectedLanguage;
      this.translate.use(localeCode);
    }
    const currentLanguage = this.translate.currentLang;
    console.log('currentLanguage', currentLanguage);
  }
}
