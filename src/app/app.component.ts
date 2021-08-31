import { Component, OnInit } from '@angular/core';
import { NavController, Platform, AlertController  } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { App } from '@capacitor/app';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(private navCtrl: NavController, private statusBar: StatusBar, private api: ApiServiceService,private platform: Platform, public alertController: AlertController) {
    this.initializeApp();
  }

  ngOnInit(): void {
    // Use Capacitor's App plugin to subscribe to the `appUrlOpen` event

    this.platform.backButton.subscribeWithPriority(5, () => {
      
      this.presentAlertConfirm();
     
   });

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
