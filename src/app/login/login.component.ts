import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { AuthService } from '../service/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  isLoginSubmitted = true;
  loginForm!: FormGroup;


  constructor(private loginService: LoginService, private router: Router,
              private formBuilder: FormBuilder,   public authService: AuthService,
    ) {}

    ngOnInit() {
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      });
    }
    

    login(): void {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          if (response.loginStatus) {
            // Login successful, store the user's data in AuthService
            this.authService.loggedInUser = {
              firstName: response.firstName,
              lastName: response.lastName,
              id: response.id
            };
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
        }
      );
    }
  }
    

