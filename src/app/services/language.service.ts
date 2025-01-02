import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { Language } from '../models/Language .interface';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLang = new BehaviorSubject<string>('en');
  currentLang$ = this.currentLang.asObservable();

  languages: Language[] =[
    { code: 'en', label: 'English', flag: 'gb' },
    { code: 'fr', label: 'Français', flag: 'fr' },
  ];
  constructor(private translate: TranslateService) {
    this.initLanguage();
  }
  private initLanguage() {
    const savedLang = localStorage.getItem('selectedLang') || 'en';
    this.translate.setDefaultLang('en');
    this.changeLanguage(savedLang);
  }
  changeLanguage(langCode: string) {
    this.currentLang.next(langCode);
    const lang = this.languages.find(l => l.code === langCode);
    if (lang) {
      this.translate.use(langCode);
      this.currentLang.next(langCode);
      localStorage.setItem('selectedLang', langCode);
    }
  }
  getCurrentLang() {
    return this.currentLang.value;
  }
}
