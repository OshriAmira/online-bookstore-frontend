import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string = "";
  password: string = "";


  constructor(private http: HttpClient, private router: Router) {}

  login(): void {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.http.post('/api/login', loginData).subscribe(
      (response) => {
        // Handle successful login response from the server
        // For example, store the user token or navigate to the next page
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        // Handle error response from the server
        // For example, display an error message to the user
      }
    );
  }

  // login(event: Event): void {
  //   event.preventDefault();
  //   // Add your login logic here
  //   // For example, you can validate the username and password
  //   // If the login is successful, navigate to the desired page
  //   this.router.navigate(['/dashboard']);
  // }
}
