import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cart as CartModel } from '../../models/cart';
import { CartService as CartService } from '../../services/cart';
import { AuthService } from '../../services/auth';
@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class CartPage implements OnInit {
  cart: CartModel | null = null;
  message = '';
  total = 0;
  constructor(
    private cartService: CartService,
    private authService: AuthService,
  ) {}
  ngOnInit(): void {
    this.loadCart();
  }
  loadCart(): void {
    const user = this.authService.getUser();
    if (!user) {
      this.message = 'Please login first';
      return;
    }
    this.cartService.getCart(user.id).subscribe({
      next: (res: { data: CartModel | null }) => {
        this.cart = res.data;
        this.calculateTotal();
      },
      error: () => {
        this.message = 'Failed to load cart';
      },
    });
  }
  increase(productId: string, quantity: number): void {
    const user = this.authService.getUser();
    this.cartService.updateCart(user.id, productId, quantity + 1).subscribe({
      next: () => this.loadCart(),
    });
  }
  decrease(productId: string, quantity: number): void {
    const user = this.authService.getUser();
    if (quantity <= 1) {
      return;
    }
    this.cartService.updateCart(user.id, productId, quantity - 1).subscribe({
      next: () => this.loadCart(),
    });
  }
  remove(productId: string): void {
    const user = this.authService.getUser();
    this.cartService.removeFromCart(user.id, productId).subscribe({
      next: () => this.loadCart(),
    });
  }
  calculateTotal(): void {
    if (!this.cart) {
      this.total = 0;
      return;
    }
    this.total = this.cart.items.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);
  }
}
