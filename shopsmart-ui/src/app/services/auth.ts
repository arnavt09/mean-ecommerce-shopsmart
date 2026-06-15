import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  register(user: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  saveUser(response: any): void {
    if (response.token) {
      localStorage.setItem('token', response.token);
    }

    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
  }

  getUser(): any {
    const user = localStorage.getItem('user');

    if (!user) {
      return null;
    }

    return JSON.parse(user);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
