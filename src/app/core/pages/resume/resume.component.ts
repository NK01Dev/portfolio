import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { SmoothScrollService } from '../../../services/smooth-scroll.service';

@Component({
  selector: 'app-resume',
  standalone: false,
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})
export class ResumeComponent {
  email: string = 'kamal.nk.naim@gmail.com';

  constructor(private smoothScrollService: SmoothScrollService) {}

  scrollToSection(anchor: string): void {
    this.smoothScrollService.scrollTo(anchor, { offset: -88, duration: 1.4 });
  }

  onProjectClick(project: { ID?: string; URL?: string }): void {
    if (project.ID) {
      this.scrollToSection('#work');
    } else if (project.URL) {
      window.open(project.URL, '_blank', 'noopener,noreferrer');
    }
  }

  downloadResume(): void {
    const resume = document.getElementById('resume');
    if (resume) {
      html2canvas(resume, { scale: 2 }).then((canvas) => {
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
        pdf.save('resume.pdf');
      });
    }
  }
}

