import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  name = '';
  email = '';
  password = '';
  message = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register(): void {
    this.authService
      .register({
        name: this.name,
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: (res: any) => {
          this.authService.saveUser(res);

          this.message = 'Registration successful';

          setTimeout(() => {
            this.router.navigate(['/products']);
          }, 1000);
        },
        error: (err) => {
          console.error(err);

          this.message =
            err?.error?.message ||
            'Registration failed';
        },
      });
  }
}