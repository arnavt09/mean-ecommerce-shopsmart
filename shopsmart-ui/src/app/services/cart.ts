import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:5000/api/cart';

  constructor(private http: HttpClient) {}

  getCart(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  addToCart(userId: string, productId: string, quantity: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, {
      userId,
      productId,
      quantity,
    });
  }

  updateCart(userId: string, productId: string, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, {
      userId,
      productId,
      quantity,
    });
  }

  removeFromCart(userId: string, productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove`, {
      body: {
        userId,
        productId,
      },
    });
  }
}
