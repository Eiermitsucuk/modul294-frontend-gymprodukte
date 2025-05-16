import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { CartComponent } from './pages/cart/cart.component';
import { adminGuard } from './guards/admin.guard'; // ✅ Custom admin role guard

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductListComponent },
  {
    path: 'products/create',
    component: ProductFormComponent,
    canActivate: [adminGuard] // ✅ Admin only
  },
  {
    path: 'products/edit/:id',
    component: ProductFormComponent,
    canActivate: [adminGuard] // ✅ Admin only
  },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent }
];
