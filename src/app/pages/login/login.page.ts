import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { mergeMap } from 'rxjs/operators';
import { AuthService } from '@auth0/auth0-angular';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private router: Router;
  private user: any;
  constructor(private navCtrl: NavController, private api: ApiServiceService, router: Router, private authService: AuthService,  public loadingController: LoadingController, public platform: Platform) {
    this.router = router;
   }

  ngOnInit() {
  }

  login() {
    // // Display loading indicator while Auth Connect login window is open
    // const loadingIndicator = await this.loadingController.create({
    //     message: 'Opening login window...' 
    //   });
    // await loadingIndicator.present();

    this.authService
      .buildAuthorizeUrl()
      .pipe(mergeMap((url) => Browser.open({ url, windowName: '_self' })))
      .subscribe((result) => {
        console.log(result)
      });
  }

}
