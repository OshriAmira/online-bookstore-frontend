import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactForm } from '../model/contactForm';

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {
  private contactFormUrl = 'http://localhost:8080/messages';

  constructor(private httpClient: HttpClient) {}

  getContactForms(): Observable<ContactForm[]> {
    return this.httpClient.get<ContactForm[]>(this.contactFormUrl);
  }

  submitContactForm(formData: any): Observable<any> {
    return this.httpClient.post(this.contactFormUrl, formData);
  }

  deleteContactForm(ContactFormID: number): Observable<void>{
    const url = `${this.contactFormUrl}/${ContactFormID}`;
    return this.httpClient.delete<void>(url);
  }


}
