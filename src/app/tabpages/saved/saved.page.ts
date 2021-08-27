import { AfterContentInit, Component, DoCheck, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.page.html',
  styleUrls: ['./saved.page.scss'],
})
export class SavedPage implements OnInit {
  siteData = [];
  constructor() {

  }

  ngOnInit(){

  }

  ionViewWillEnter() {

    this.loadSiteData();
  }


  loadSiteData(){
    let siteDataStr = localStorage.getItem("saved_sites");
    if(siteDataStr !== null && siteDataStr != ''){
      this.siteData = JSON.parse(siteDataStr);
    }
  
  }

  saveSite(site){
    this.siteData = this.siteData.filter((el) => {
      return el.siteGuid !== site.siteGuid
    });

    localStorage.setItem("saved_sites", JSON.stringify(this.siteData));
    
  }
  


}
