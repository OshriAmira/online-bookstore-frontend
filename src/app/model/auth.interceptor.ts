import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add the necessary authentication logic here
    const username = 'user';
    const password = '0a64f332-8fe7-4a31-93b0-81a63bd27915';

    // Clone the request and add the authentication credentials to the headers
    const authRequest = request.clone({
      setHeaders: {
        Authorization: 'Basic ' + btoa(username + ':' + password)
      }
    });

    // Pass the modified request to the next interceptor or to the HTTP handler
    return next.handle(authRequest);
  }
}
