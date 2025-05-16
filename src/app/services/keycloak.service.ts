import Keycloak from 'keycloak-js';

export class KeycloakService {
  static keycloak: Keycloak;

  static init(): Promise<void> {
    this.keycloak = new Keycloak({
      url: 'http://localhost:8080/',
      realm: 'ILV',
      clientId: 'gymprodukteapp'
    });

    return this.keycloak.init({
      onLoad: 'login-required',
      checkLoginIframe: false
    }).then(authenticated => {
      if (!authenticated) {
        window.location.reload();
      }
    });
  }

  static getToken(): string {
    return this.keycloak.token!;
  }

  static logout(): void {
    this.keycloak.logout();
  }

  static getUsername(): string {
    return this.keycloak.tokenParsed?.['preferred_username'] || '';
  }

  static isAdmin(): boolean {
    const resourceRoles = this.keycloak.tokenParsed?.resource_access?.['gymprodukteapp']?.roles || [];
    return resourceRoles.includes('ROLE_admin'); // ← key change here
  }
}
