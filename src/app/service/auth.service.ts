import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInUser: any;

  private loginPageUrl = "http://localhost:8080/login1";

  constructor(private httpClient: HttpClient) {}

  login(formData: any): Observable<any> {
    const body = { formData };
    return this.httpClient.post<any>(this.loginPageUrl, body);
  }

  logout(): void {
    this.loggedInUser = null;
  }

  isAnyoneLoggedin(): boolean {
    return this.loggedInUser !== null && this.loggedInUser !== undefined;
  }

  
}
