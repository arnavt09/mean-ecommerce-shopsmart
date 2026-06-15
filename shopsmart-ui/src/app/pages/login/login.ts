import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  message = '';
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login(): void {
    this.message = '';

    this.authService
      .login({
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: (res: any) => {
          this.authService.saveUser(res);

          this.message = 'Login successful';

          setTimeout(() => {
            this.router.navigate(['/products']);
          }, 1000);
        },
        error: (err) => {
          console.error(err);

          this.message = err?.error?.message || 'Invalid email or password';
        },
      });
  }
}
