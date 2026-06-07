import { Routes } from '@angular/router';
import { ProductList } from './pages/product-list/product-list';
import { Cart } from './pages/cart/cart';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Orders } from './pages/orders/orders';

export const routes: Routes = [
  { path: '', component: ProductList },
  { path: 'cart', component: Cart },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'orders', component: Orders },
  { path: '**', redirectTo: '' }
];