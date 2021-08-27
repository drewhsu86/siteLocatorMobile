import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { domain, clientId, callbackUri } from './auth.config';
import { GoogleMapsService } from './services/google-maps.service';
import { ConnectivityService } from './services/connectivity.service';
import { GoogleMapsClusterService } from './services/google-maps-cluster.service';


const config = {
  domain,
  clientId,
  redirectUri: callbackUri,
  /* Uncomment the following lines for better support  in browers like Safari where third-party cookies are blocked.
    See https://auth0.com/docs/libraries/auth0-single-page-app-sdk#change-storage-options for risks.
  */
  // cacheLocation: "localstorage",
  // useRefreshTokens: true
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    SuperTabsModule.forRoot(), 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, StatusBar, Geolocation,Toast, HttpClient, CallNumber, GoogleMapsService, ConnectivityService, GoogleMapsClusterService],
  bootstrap: [AppComponent],
})
export class AppModule {}
