import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  // email: string = "";
  // password: string = "";
  isLoginSubmitted = true;
  loginForm!: FormGroup;


  constructor(private loginService: LoginService, private router: Router,
              private formBuilder: FormBuilder
    ) {}

  ngOnInit() {
    this. loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login(): void {
    this.loginService.LoginAttempt(this.loginForm.value).subscribe(
      (isAuthenticated) => {
        if (isAuthenticated) {
          // Login successful, navigate to the desired page
          this.router.navigate(['/dashboard']);
        } else {
          // Login failed, show error message
          this.isLoginSubmitted = false;
          this.loginForm.reset();
        }
      },
      (error) => {
        console.error(error);
        // Handle error, show error message
        //this.isLoginSubmitted = false;
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
