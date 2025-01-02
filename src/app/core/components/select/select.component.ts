import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-select',
  standalone: false,
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent {
  isOpen = false;
  focusedIndex = -1;

  @ViewChild('languageToggle') languageToggle!: ElementRef;
  @ViewChild('languageDropdown') languageDropdown!: ElementRef;

  constructor(public languageService: LanguageService) {}

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.languageToggle.nativeElement.contains(event.target) &&
        !this.languageDropdown.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.isOpen) {
      const items = this.languageDropdown.nativeElement.querySelectorAll('button');
      switch (event.key) {
        case 'ArrowDown':
          this.focusedIndex = (this.focusedIndex + 1) % items.length;
          items[this.focusedIndex].focus();
          break;
        case 'ArrowUp':
          this.focusedIndex = (this.focusedIndex - 1 + items.length) % items.length;
          items[this.focusedIndex].focus();
          break;
        case 'Escape':
          this.isOpen = false;
          this.languageToggle.nativeElement.focus();
          break;
        case 'Enter':
          if (this.focusedIndex >= 0) {
            items[this.focusedIndex].click();
          }
          break;
      }
    }
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.focusedIndex = -1;
    }
  }

  selectLanguage(langCode: string) {
    this.languageService.changeLanguage(langCode);
    this.isOpen = false;
  }
}