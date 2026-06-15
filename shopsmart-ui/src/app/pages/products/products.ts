import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class ProductPage implements OnInit {
  products: Product[] = [];
  message = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data;
      },
      error: () => {
        this.message = 'Failed to load products';
      },
    });
  }

  addToCart(productId: string): void {
    const user = this.authService.getUser();

    if (!user) {
      this.message = 'Please login first';
      return;
    }

    this.cartService.addToCart(user.id, productId, 1).subscribe({
      next: () => {
        this.message = 'Product added to cart';
      },
      error: () => {
        this.message = 'Failed to add product';
      },
    });
  }
}
