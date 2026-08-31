import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HomeComponent } from './home.component';
import { DarkModeService } from '../../../dark-mode.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let darkModeService: DarkModeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [TranslateModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    darkModeService = TestBed.inject(DarkModeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial video and poster based on default dark mode', () => {
    expect(component.currentVideo).toBeDefined();
    expect(component.currentPoster).toBeDefined();
  });

  it('should switch video and poster when dark mode changes', () => {
    darkModeService.toggleDarkMode();
    const isDark = darkModeService.getIsDarkMode();

    if (isDark) {
      expect(component.currentVideo).toBe('/assets/videos/hero-dark.mp4');
      expect(component.currentPoster).toBe('/assets/images/video-posters/hero-dark.webp');
    } else {
      expect(component.currentVideo).toBe('/assets/videos/hero-light.mp4');
      expect(component.currentPoster).toBe('/assets/images/video-posters/hero-light.webp');
    }
  });
});

