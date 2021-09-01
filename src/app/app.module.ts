import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy, isPlatform } from '@ionic/angular';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GoogleMapsService } from './services/google-maps.service';
import { ConnectivityService } from './services/connectivity.service';
import { GoogleMapsClusterService } from './services/google-maps-cluster.service';
import { AuthModule } from '@auth0/auth0-angular';
import config from 'capacitor.config';

// Build the URL that Auth0 should redirect back to
const {appId} = config;
export const callbackUri = isPlatform("desktop")
? "http://localhost:4200"
: `${appId}://onlinecolostage.us.auth0.com/capacitor/${appId}/callback`;

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    SuperTabsModule.forRoot(), 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule,
    AuthModule.forRoot({
      domain: "onlinecolostage.us.auth0.com",
      clientId: "464sLWL3LhOp1Xg91pEFQkb6QsHNYkNk",
      redirectUri: callbackUri
    })
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, StatusBar, Geolocation,Toast, HttpClient, CallNumber, GoogleMapsService, ConnectivityService, GoogleMapsClusterService],
  bootstrap: [AppComponent],
})
export class AppModule {}
