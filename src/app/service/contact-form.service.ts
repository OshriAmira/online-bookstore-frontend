import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,map } from 'rxjs';
import { ContactForm } from '../model/contactForm';

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {
  private contactFormUrl = 'http://localhost:8080/messages';

  contactMessages: ContactForm[] = [];

  constructor(private httpClient: HttpClient) {}

  getContactForms(): Observable<ContactForm[]> {
    return this.httpClient.get<ContactForm[]>(this.contactFormUrl);
  }

  getContactFormById(MessageId: number): Observable<ContactForm[]> {
    return this.getContactForms().pipe(
      map(contactMessages => contactMessages.filter(contactMessages => 
        contactMessages.id == MessageId))
    );
  }

  filterContactFormsByStatus(messageStatus: boolean): ContactForm[] {
    return this.contactMessages.filter(message => message.status === messageStatus);
  }

  getContactFormsByStatus(messageStatus: boolean): Observable<ContactForm[]> {
    return this.getContactForms().pipe(
      map(contactMessages => {
        this.contactMessages = contactMessages; // Update the contactMessages array
        return contactMessages.filter(message => message.status === messageStatus);
      })
    );
  }

  submitContactForm(formData: any): Observable<any> {
    return this.httpClient.post(this.contactFormUrl, formData);
  }

  deleteContactForm(ContactFormID: number): Observable<void>{
    const url = `${this.contactFormUrl}/${ContactFormID}`;
    return this.httpClient.delete<void>(url);
  }

  updateMessageStatus(messageId: number, newStatus: boolean | null): Observable<ContactForm> {
    const body = newStatus;
    const url = `${this.contactFormUrl}/${messageId}`;
    return this.httpClient.put<ContactForm>(url, body);
  }

}
