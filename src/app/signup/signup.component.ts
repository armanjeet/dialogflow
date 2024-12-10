import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.authService.register(this.signupForm.value).subscribe({
        next: (response) => {
          this.toastr.success('Registration successful!', 'Success');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.toastr.error('Registration failed. Please try again.', 'Error');
          console.error("Registration error", error);
        }
      });
    } else {
      this.signupForm.markAllAsTouched();
      this.toastr.warning('Please fill out all required fields.', 'Warning');
    }
  }
}
