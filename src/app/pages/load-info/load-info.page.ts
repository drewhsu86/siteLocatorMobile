import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-load-info',
  templateUrl: './load-info.page.html',
  styleUrls: ['./load-info.page.scss'],
})
export class LoadInfoPage implements OnInit {

  loadStr = "Loading";
  timer = null;
  constructor( private navCtrl: NavController, private api: ApiServiceService, private router: Router) { }

  ngOnInit() {
  
    // this.api.getValidToken() 
    //   .then(({data}) => {
    //   console.log(data);
    //   localStorage.setItem("vb_token", data);

    // })
    // .catch(e => {
    //   console.log(e);
    //   this.navCtrl.navigateForward('login-fail');
    // })
    // this.api.getToken('','');
  }

  ionViewDidEnter(){
    // this.api.getValidToken().then(({data}) => {
    //   console.log(data);
    //   localStorage.setItem("vb_token", data);
      // let navigationExtras: NavigationExtras = {
      //   queryParams:{
      //     vb_token: data
      //   }
      // };
      // this.router.navigate([''], navigationExtras);
      this.navCtrl.navigateRoot('');
    // })
    // .catch(e => {
    //   console.log(e);
    //   this.navCtrl.navigateRoot('login-fail');
    // })
  }

}
