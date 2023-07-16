import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  login(event: any): void {
    event.preventDefault(); // Prevent the default form submission behavior
    
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;
    
    this.authService.login(username, password).subscribe(
      (response) => {
        // Handle successful login
        console.log('Login successful', response);
      },
      (error) => {
        // Handle login error
        console.error('Login failed', error);
      }
    );
  }
  


}
