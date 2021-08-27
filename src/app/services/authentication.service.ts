import { Injectable } from '@angular/core';
import { IonicAuth, IonicAuthOptions } from '@ionic-enterprise/auth';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends IonicAuth {

  private router: Router;
  private loadingIndicator: HTMLIonLoadingElement;
  constructor(router: Router, plt: Platform) {
      const auth0Config : IonicAuthOptions = {
        // the auth provider
        authConfig: 'auth0',
        // The platform which the app is running on
        platform: 'capacitor',
        // client or application id for provider
        clientID: 'XHDSNIeKnHKRL1q2qoJlMtB6p9cv4spS',
        // the discovery url for the provider
        // OpenID configuration
        discoveryUrl: 'https://creativeit.auth0.com/.well-known/openid-configuration',
        // the URI to redirect to after log in
        redirectUri: 'io.ionic.starter://callback',
        // requested scopes from provider
        scope: 'openid offline_access email picture profile',
        // the audience, if applicable
        audience: 'https://creativeit.auth0.com/api/v2/',
        // the URL to redirect to after log out
        logoutUrl: 'io.ionic.starter://login?logout=true',
        // The type of iOS webview to use. 'shared' will use a webview that can 
        // share session/cookies on iOS to provide SSO across multiple apps but
        // will cause a prompt for the user which asks them to confirm they want
        // to share site data with the app. 'private' uses a webview which will
        // not prompt the user but will not be able to share session/cookie data
        // either for true SSO across multiple apps.
        iosWebView: 'private',
        // required if running on the Web
        clientSecret: ''
      };
      super(auth0Config);
      this.router = router;
    }
     async login(loadingIndicator: any) {
       this.loadingIndicator = loadingIndicator;
       await super.login();
     }
    async onLoginSuccess(response: any) {
      await this.router.navigate(['']);
      this.loadingIndicator.dismiss();
    }
    async onLogout() {
      this.router.navigate(['login']);
    }
    async logout() {
      super.logout();
    }
    async isAuthenticated() {
      return await super.isAuthenticated();
    }
    async getUserInfo() {
      return await super.getIdToken();
    }
}
