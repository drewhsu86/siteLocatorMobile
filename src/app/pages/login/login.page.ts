import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, Platform, LoadingController } from '@ionic/angular';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  private router: Router;
  private user: any;
  constructor(private navCtrl: NavController, private api: ApiServiceService, router: Router, private authService: AuthenticationService,  public loadingController: LoadingController) {
    this.router = router;
    this.form = new FormGroup({
      username: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      password: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required, Validators.minLength(6)]
      })
    });
   }

  ngOnInit() {
  }

  async login() {
    // Display loading indicator while Auth Connect login window is open
    const loadingIndicator = await this.loadingController.create({
        message: 'Opening login window...' 
      });
    await loadingIndicator.present();
    await this.authService.login(loadingIndicator);
  }

}
