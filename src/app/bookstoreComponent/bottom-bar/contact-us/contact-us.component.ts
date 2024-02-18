import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactFormService } from '../../../service/contact-form.service';
import { ContactForm } from '../../../model/contactForm';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
  contactForm!: FormGroup;
  isFormSubmitted = false;
  



  constructor(private formBuilder: FormBuilder,
              private contactFormService: ContactFormService
              ) {}

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.contactForm.valid) {
      // Form is valid, handle form submission logic here
      console.log(this.contactForm.value);
      this.contactFormService.submitContactForm(this.contactForm.value).subscribe(
        () => {
          // Handle success
          this.isFormSubmitted = true;
        },
        (error) => {
          // Handle error if needed
          console.error('Form submission failed:', error);
        }
      );
      // Reset the form after successful submission
      this.contactForm.reset();
    } else {
      // Mark form controls as touched to display validation errors
      this.markFormGroupTouched(this.contactForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

}
