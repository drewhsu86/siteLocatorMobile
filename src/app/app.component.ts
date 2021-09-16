import { Component, OnInit } from '@angular/core';
import { NavController, Platform, AlertController  } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { App } from '@capacitor/app';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { AuthService } from '@auth0/auth0-angular';
import { callbackUri } from './app.module';
import { mergeMap } from 'rxjs/operators';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  public isLoggedIn = false;
  constructor(private navCtrl: NavController, private statusBar: StatusBar, private api: ApiServiceService,private platform: Platform, public alertController: AlertController, public auth: AuthService) {
    // this.initializeApp();
  }

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;

      if(this.isLoggedIn){
        this.navCtrl.navigateRoot('');
    }else{
      this.navCtrl.navigateRoot('login');
      // this.navCtrl.navigateRoot('');
      }
    })
    App.addListener('appStateChange', ({ isActive }) => {
      console.log('App state changed. Is active?', isActive);
    });


    App.addListener('appUrlOpen', ({ url }) => {
      if (url?.startsWith(callbackUri)) {
        if (
          url.includes('state=') &&
          (url.includes('error=') || url.includes('code='))
        ) {
          this.auth
            .handleRedirectCallback(url)
            .pipe(mergeMap(() => Browser.close()))
            .subscribe();
            this.navCtrl.navigateRoot('');//this is what we were testing
        } else {
          Browser.close();
        }
      }
    });
    // Use Capacitor's App plugin to subscribe to the `appUrlOpen` event

  //   this.platform.backButton.subscribeWithPriority(5, () => {
      
  //     this.presentAlertConfirm();
     
  //  });

  }

  initializeApp(){
    if(localStorage.getItem("vb_token") != null && localStorage.getItem("vb_token") != ""){
      this.navCtrl.navigateRoot('');
    }else{
      this.navCtrl.navigateRoot('login');
      // this.navCtrl.navigateRoot('');
    }
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Message',
      message: 'Are you sure want to exit Vertical Bridge?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            App.exitApp();
          }
        }
      ]
    });

    await alert.present();
  }
}
