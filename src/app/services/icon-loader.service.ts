import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconLoaderService {
  private iconsFolderPath = 'assets/icons/';
  getIcons(): string[] {
    // List the icon filenames manually or fetch dynamically from the backend if needed.
    return [
      'angular-icon.svg',
      'dart-original.svg',
      'git-plain.svg',
    ].map((icon) => this.iconsFolderPath + icon);
  }
  constructor() { }
}
