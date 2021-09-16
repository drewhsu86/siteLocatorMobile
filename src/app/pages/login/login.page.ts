import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, isPlatform } from '@ionic/angular';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { mergeMap } from 'rxjs/operators';
import { AuthService } from '@auth0/auth0-angular';
import { Platform } from '@ionic/angular';
import config from 'capacitor.config';
import { App } from '@capacitor/app';
import { callbackUri } from 'src/app/app.module';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public isLoggedIn = false;
  private appId: string = config.appId;
  public callbackUri = `${this.appId}://onlinecolostage.us.auth0.com/capacitor/${this.appId}/`;
  constructor(private navCtrl: NavController, private api: ApiServiceService, router: Router, private auth: AuthService,  public loadingController: LoadingController, public platform: Platform) {
   }

  ngOnInit() {
    this.auth.isAuthenticated$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;

      if(this.isLoggedIn){
        this.navCtrl.navigateRoot('');
    }else{
      this.navCtrl.navigateRoot('login');
      // this.navCtrl.navigateRoot('');
      }
    })
  }

  login() {
  if(this.isLoggedIn){
    this.navCtrl.navigateRoot('');
  }
  else{
    this.auth
      .buildAuthorizeUrl()
      .pipe(mergeMap((url) => Browser.open({ url, windowName: '_self' })))
      .subscribe();
  }
  }

}
