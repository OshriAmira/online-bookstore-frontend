import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginPageUrl = "http://localhost:8080/login1";

  constructor(private httpClient: HttpClient) { }

  // checkUser(email: string, password: string): Observable<any> {
  //   const body = { email, password };
  //   console.log("good", email,password);
  //   console.log (this.httpClient.post(this.LoginPageUrl, body));
  //   return this.httpClient.post(this.LoginPageUrl, body);
    
  // }

  LoginAttempt(formData: any): Observable<boolean>{
    const body = { formData };
    console.log (formData);
    return this.httpClient.post<boolean>(this.loginPageUrl, body);
  }
  
}
