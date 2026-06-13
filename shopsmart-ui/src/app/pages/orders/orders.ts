import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order as OrderModel } from '../../models/order';
import { OrderService as OrderService } from '../../services/order';
import { AuthService } from '../../services/auth';
@Component({
  selector: 'app-orders',
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class OrdersPage implements OnInit {
  orders: OrderModel[] = [];
  message = '';
  constructor(
    private orderService: OrderService,
    private authService: AuthService,
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
    this.orderService.checkout(user.id).subscribe({
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
    this.orderService.getUserOrders(user.id).subscribe({
      next: (res) => {
        this.orders = res.data;
      },
      error: () => {
        this.message = 'Failed to load orders';
      },
    });
  }
}
