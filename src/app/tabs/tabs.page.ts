import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  new_noti = 0;
  new_mess = 0;
  urls: any;

  constructor(
    private route: Router,
  ) {

  }

  ionViewWillEnter() {

  }

}
