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
  
}
