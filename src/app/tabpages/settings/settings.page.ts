import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  private router: Router;
  constructor(private navCtrl: NavController, public alertController: AlertController, public platform: Platform, private authService : AuthService, router: Router) {
    this.router = router;
   }

  ngOnInit() {
  }



  async logOut(){
    this.presentAlertConfirm();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Message',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.doLogOut();
          }
        }
      ]
    });

    await alert.present();
  }

  doLogOut(){
    localStorage.setItem("vb_token", "");
    localStorage.setItem("auth_stage", "log_out");
    this.authService.logout();
  }

}
