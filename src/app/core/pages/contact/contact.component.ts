import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { SeoService } from '../../../services/seo.service';
import { AnalyticsService } from '../../analytics/analytics.service';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  lottieOptions: AnimationOptions = {
    path: '/assets/animation/email.json', // Correct path
    loop: true, // Whether the animation should loop
    autoplay: true, // Whether the animation should start automatically
  };
  // Optional: Handle the animationCreated event
  onAnimationCreated(animationItem: AnimationItem): void {
    console.log('Animation created:', animationItem);
  }
  form: FormGroup; // Declare the form without initializing it here.
  submitted = false;
  success = false;
  error = false;
  loading = false;

  private readonly analytics = inject(AnalyticsService);

  constructor(
    private fb: FormBuilder,
    private seoService: SeoService
  ) {
    // Initialize the form in the constructor where fb is available.
    this.form = this.fb.group({
      from_name: ['', Validators.required],
      to_name: 'Admin',
      from_email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.seoService.updateSeo({
      title: 'Contact Kamal Naim — Software Engineer & Cross-Platform Developer',
      description:
        'Get in touch with Kamal Naim for software engineering roles, cross-platform app development (Flutter), full-stack projects, and technical consulting.',
      canonicalUrl: 'https://kamalnaim.vercel.app/contact',
      breadcrumbs: [
        { name: 'Home', url: 'https://kamalnaim.vercel.app/' },
        { name: 'Contact', url: 'https://kamalnaim.vercel.app/contact' },
      ],
    });
  }

  title = 'test2';

  async send() {
    this.submitted = true;
    this.loading = true;
    this.success = false;
    this.error = false;
  // Log form validity and values
  console.log('Form Valid:', this.form.valid);
  console.log('Form Values:', this.form.value);
  if (!this.form.valid) {
    this.loading = false;
    return;
  }
    try {
      emailjs.init('3XL79KQqYdiSyjR09');
      const response =  await emailjs.send("service_cayep4l", "template_ior6s98", {
        from_name: this.form.value.from_name,
        to_name: this.form.value.to_name,
        from_email: this.form.value.from_email,
        subject: this.form.value.subject,
        message: this.form.value.message,
      });
      console.log('EmailJS Response:', response);

      this.success = true;
      this.analytics.trackContactSubmit();
      this.form.reset();
    } catch (err) {
      console.error('FAILED...', err);
      this.error = true;
    } finally {
      this.loading = false;
    }
  } 
}