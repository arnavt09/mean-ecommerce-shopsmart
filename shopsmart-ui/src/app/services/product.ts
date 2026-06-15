import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:5000/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<{ success: boolean; count: number; data: Product[] }> {
    return this.http.get<{ success: boolean; count: number; data: Product[] }>(this.apiUrl);
  }

  getProductById(id: string): Observable<{ success: boolean; data: Product }> {
    return this.http.get<{ success: boolean; data: Product }>(`${this.apiUrl}/${id}`);
  }
}