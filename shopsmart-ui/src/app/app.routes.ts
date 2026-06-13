import { Routes } from '@angular/router';
import { ProductPage } from './pages/products/products';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { CartPage } from './pages/cart/cart';
import { OrdersPage } from './pages/orders/orders';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductPage },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'cart', component: CartPage },
  { path: 'orders', component: OrdersPage },
  { path: '**', redirectTo: 'products' },
];
