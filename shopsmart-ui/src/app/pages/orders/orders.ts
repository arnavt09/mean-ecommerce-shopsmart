import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class OrdersPage implements OnInit {
  orders: Order[] = [];
  message = '';

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  checkout(): void {
    const user = this.authService.getUser();

    if (!user) {
      this.message = 'Please login first';
      return;
    }

    const userId = user._id || user.id;

    this.orderService.checkout(userId).subscribe({
      next: () => {
        this.message = 'Order placed successfully';
        this.loadOrders();
      },
      error: () => {
        this.message = 'Checkout failed. Make sure your cart has items.';
      },
    });
  }

  loadOrders(): void {
    const user = this.authService.getUser();

    if (!user) {
      this.message = 'Please login first';
      return;
    }

    const userId = user._id || user.id;

    this.orderService.getUserOrders(userId).subscribe({
      next: (res: any) => {
        this.orders = Array.isArray(res) ? res : res.data;
      },
      error: () => {
        this.message = 'Failed to load orders';
      },
    });
  }
}