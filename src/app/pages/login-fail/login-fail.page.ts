import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
@Component({
  selector: 'app-login-fail',
  templateUrl: './login-fail.page.html',
  styleUrls: ['./login-fail.page.scss'],
})
export class LoginFailPage implements OnInit {
  desText = "You do not have the Site Locator role, and can not access the app. Please contact <email> or <Phone Number> to request access to the Site Locator app.";
  backBtnStr = "< Back to Login Page";

  constructor( private navCtrl: NavController) { }

  ngOnInit() {
  }

  backToLogin(){
    localStorage.setItem("loggedin", 'true');
    this.navCtrl.navigateRoot("login");
  }
}
