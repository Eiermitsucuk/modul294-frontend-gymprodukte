import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { KeycloakService } from './app/services/keycloak.service';

KeycloakService.init().then(() => {
  bootstrapApplication(AppComponent, appConfig)
    .catch(err => console.error(err));
});
