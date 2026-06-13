import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
@Component({
  selector: 'app-register',
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
    private router: Router,
  ) {}
  register(): void {
    this.authService
      .register({
        name: this.name,
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: (_res: any) => {
          this.authService.saveUser(_res.data);
          this.message = 'Registration successful';
          this.router.navigate(['/products']);
        },
        error: () => {
          this.message = 'Register failed';
        },
      });
  }
}
