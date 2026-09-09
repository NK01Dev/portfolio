import { Component, OnInit, inject } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { SmoothScrollService } from '../../../services/smooth-scroll.service';
import { SeoService } from '../../../services/seo.service';
import { AnalyticsService } from '../../analytics/analytics.service';

@Component({
  selector: 'app-resume',
  standalone: false,
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})
export class ResumeComponent implements OnInit {
  email: string = 'kamal.nk.naim@gmail.com';

  private readonly analytics = inject(AnalyticsService);

  constructor(
    private smoothScrollService: SmoothScrollService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.seoService.updateSeo({
      title: 'Resume & Credentials — Kamal Naim | Software Engineer',
      description:
        'Official credentials, software engineering background, ENSA Master ILMSI, Simplon DevOps certification, and verified technical skills of Kamal Naim.',
      canonicalUrl: 'https://kamalnaim.vercel.app/resume',
      breadcrumbs: [
        { name: 'Home', url: 'https://kamalnaim.vercel.app/' },
        { name: 'Resume', url: 'https://kamalnaim.vercel.app/resume' },
      ],
    });
  }

  scrollToSection(anchor: string): void {
    this.smoothScrollService.scrollTo(anchor, { offset: -88, duration: 1.4 });
  }

  onProjectClick(project: { ID?: string; URL?: string }): void {
    this.analytics.trackProjectView(project.ID || project.URL || 'resume_project');
    if (project.ID) {
      this.scrollToSection('#work');
    } else if (project.URL) {
      window.open(project.URL, '_blank', 'noopener,noreferrer');
    }
  }

  onEmailClick(): void {
    this.analytics.trackEmailClick();
  }

  downloadResume(): void {
    this.analytics.trackResumeDownload();
    const resume = document.getElementById('resume-section');
    if (resume) {
      html2canvas(resume, { scale: 2 }).then((canvas: HTMLCanvasElement) => {
        const imgData = canvas.toDataURL('image/png', 1.0);
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
          putOnlyUsedFonts: true,
          floatPrecision: 16
        });
        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('Kamal_Naim_Resume.pdf');
      });
    }
  }
}

