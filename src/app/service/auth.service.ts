import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInUser: any;

  private loginPageUrl = "http://localhost:8080/login1";

  constructor(private httpClient: HttpClient) {}

  // login(formData: any): Observable<any> {
  //   const body = { formData };
  //   return this.httpClient.post<any>(this.loginPageUrl, body);
  // }

  login(formData: any): Observable<any> {
    const body = { formData };
    return this.httpClient.post<any>(this.loginPageUrl, body)
      .pipe(
        // Process the response after the login API call
        map(response => {
          if (response.loginStatus) {
            // Login successful, store the user's data in local storage
            this.loggedInUser = {
              firstName: response.firstName,
              lastName: response.lastName,
              id: response.id,
              email: formData.email,
              role: response.role
            };
            localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));
          }
          return response; // Return the response from the login API call
        })
      );
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');
    this.loggedInUser = null;
  }

  isAnyoneLoggedin(): boolean {
    return this.loggedInUser !== null && this.loggedInUser !== undefined;
  }

  
}
