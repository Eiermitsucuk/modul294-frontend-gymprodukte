import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';

import { KeycloakService } from './services/keycloak.service';

const authInterceptor = (req: any, next: any) => {
  const token = KeycloakService.getToken();
  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });
  return next(authReq);
};

export const appConfig = {
  standalone: true,
  imports: [
    NavbarComponent,
    HomeComponent,
    ProductListComponent,
    ProductFormComponent,
    ProfileComponent,
    LoginComponent
  ],  
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
