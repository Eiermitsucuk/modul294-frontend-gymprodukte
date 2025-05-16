import { CanActivateFn } from '@angular/router';
import { KeycloakService } from '../services/keycloak.service'; // ✅ Use your service

export const adminGuard: CanActivateFn = () => {
  return KeycloakService.isAdmin(); // ✅ Simple, readable, and does the job
};
