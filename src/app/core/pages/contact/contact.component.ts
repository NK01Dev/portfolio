import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
@Component({
  selector: 'app-contact',
  standalone: false,
  
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
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
  constructor(private fb: FormBuilder) {
    // Initialize the form in the constructor where fb is available.
    this.form = this.fb.group({
      from_name: ['', Validators.required],
      to_name: 'Admin',
      from_email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  title = 'test2';

  async send() {
    this.submitted = true;
    this.loading = true;
    this.success = false;
    this.error = false;
  
    try {
      emailjs.init('3XL79KQqYdiSyjR09');
      await emailjs.send("service_cayep4l", "template_ior6s98", {
        from_name: this.form.value.from_name,
        to_name: this.form.value.to_name,
        from_email: this.form.value.from_email,
        subject: this.form.value.subject,
        message: this.form.value.message,
      });
  
      this.success = true;
      this.form.reset();
    } catch (err) {
      console.error('FAILED...', err);
      this.error = true;
    } finally {
      this.loading = false;
    }
  } 
}