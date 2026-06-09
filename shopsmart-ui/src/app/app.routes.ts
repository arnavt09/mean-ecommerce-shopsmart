import { Routes } from '@angular/router';

import { Product } from './pages/product/product';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Cart } from './pages/cart/cart';
import { Orders } from './pages/orders/orders';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },

  { path: 'products', component: Product },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'cart', component: Cart },
  { path: 'orders', component: Orders },

  { path: '**', redirectTo: 'products' }
];