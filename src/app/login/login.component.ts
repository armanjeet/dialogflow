import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../services/loader.service';  

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private loaderService: LoaderService // Inject the loader service
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],  // Changed to 'username'
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = {
        username: this.loginForm.value.username,  // Use 'username' instead of 'email'
        password: this.loginForm.value.password
      };

      // Show the loader before the login request starts
      this.loaderService.show();

      this.authService.login(credentials).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.toastr.success('Login successful!', 'Success');
          localStorage.setItem('token', response.token);

          // Hide the loader and navigate to the agent page
          this.loaderService.hide();
          this.router.navigate(['/agent']);
        },
        error: (error) => {
          this.toastr.error('Login failed. Please try again.', 'Error');
          console.error('Login failed', error);

          // Hide the loader in case of an error
          this.loaderService.hide();
          // Handle login failure (e.g., display error message)
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
