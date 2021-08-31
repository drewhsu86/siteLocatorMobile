import { AfterViewInit, Component, OnInit, DoCheck, NgZone,ViewChild,ElementRef } from '@angular/core';
import { IonPullUpFooterState } from 'ionic-pullup';
import { NavController, Platform, LoadingController } from '@ionic/angular';
import { LocationService } from '../../services/location.service';
import { Capacitor } from "@capacitor/core";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Share } from '@capacitor/share';
import { GoogleMapsService } from 'src/app/services/google-maps.service';
import { GoogleMapsClusterService } from 'src/app/services/google-maps-cluster.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, AfterViewInit  {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
  footerState: IonPullUpFooterState;
  pullUpToolBarStatus = false;
  pullUpTopMargin = 300;
  moreDetailStatus = false;
  locationEnabled = true;
  searchOriginal = false;
  searchText: string;
  searchRadius = 5;
  defaultSearchText = '33062';
  lat: any = null;
  lng: any;
  zoomSize: any;
  watchId: any;
  markerClusterer: any;
  siteData: any = [];
  selectedSite: any = {
    "siteGuid": "abbd119e-d383-ea11-9442-000d3a7d6214",
    "newSiteNo": "US-FL-1858",
    "siteName": "Enclave at Waterways",
    "siteCategory": "Rooftop",
    "siteType": "Apartment",
    "agl": 36.0,
    "amsl": 11.1,
    "latitude": 26.30422600,
    "longitude": -80.16332900,
    "lat": 26.30422600,
    "lng": -80.16332900,
    "siteAddress": "4359 SW 10th Pl",
    "siteCity": "Deerfield Beach",
    "siteStateOrProvince": "FL",
    "sitePostalCode": "33442",
    "rlmName": "Bill LaSala",
    "rlmEmail": "BLaSala@verticalbridge.com",
    "rlmPhone": "973-223-4231",
    "rlmAddress": "750 Park Of Commerce Blvd, Suite 200",
    "rlmCity": "Boca Raton",
    "rlmStateOrProvince": "FL",
    "rlmPostalCode": "33487",
    "asrNumber": "null",
    "saved": false
};
searchFlag = false;
map:any = null;
searchResultText = "SEARCH RESULTS"
vb_token = "";
mapClusterer: any = null;

directionService: any = null;
directionDisplay: any = null;

currentLocation: any = {
  lat: 26.30422600,
  lng: -81.16332900
};

markers:any = [];

markerClicked = 0;
  constructor(
    private route: ActivatedRoute, private router: Router,
    public ngZone: NgZone, 
    private locationService: LocationService,
    private geolocation: Geolocation,
    private toast: Toast,
    private api: ApiServiceService,
    public loadingController: LoadingController,
    private callNumber: CallNumber,
    public platform: Platform, public maps: GoogleMapsService, public mapCluster: GoogleMapsClusterService
    ) 
    {
      // this.route.queryParams.subscribe(params => {
      //   if (params && params.special) {
      //     this.vb_token = params.special;
      //   }
      // });

      this.getMyLocation();
  }

  ngOnInit() {
    this.footerState = IonPullUpFooterState.Collapsed;
      
  }

  ngAfterViewInit() {
    // set top margin dynamically
    //this.pullUpTopMargin = window.innerHeight / 100 * 40 + 94;
    this.loadSitesData();
    // this.loadSiteTempData();
  }

  ionViewWillEnter(){

    let siteDataStr = localStorage.getItem("saved_sites");
    if(siteDataStr !== null && siteDataStr != ''){
      for(let i = 0; i < this.siteData.length; i++){
        if(siteDataStr.indexOf(this.siteData[i].siteGuid) != -1){
          this.siteData[i].saved = true;
        }else{
          this.siteData[i].saved = false;
        }
      }
    }else{
      let tmp = [];
      localStorage.setItem("saved_sites", JSON.stringify(tmp));
    }
  }

  loadMap() {
    let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then((map) => {
      this.map = map;
    })
  }
  loadMapCluster(lat, lng, zoom){
      if(this.map == null){
        let mapLoaded = this.maps.update(lat, lng, zoom, this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then((map) => {
          this.map = map;
          this.markerClusterer = this.mapCluster.addCluster(map, this.siteData);
          this.directionDisplay = this.mapCluster.getDirectionDisplay(this.map);
          this.directionService = this.mapCluster.getDirectionService();
          this.markers = this.markerClusterer.getMarkers();
          console.log(this.markerClusterer.getMarkers());
          this.addEventMarkerDetail();
        });  
      }else{
        this.map.setZoom(zoom);
        let latLng = new google.maps.LatLng(lat, lng);
        this.map.setCenter(latLng);
        console.log(this.siteData);
        if(!this.searchOriginal){
          this.markerClusterer = this.mapCluster.updateCluster(this.markerClusterer, this.siteData);
          this.markers = this.markerClusterer.getMarkers();
          this.addEventMarkerDetail();
        }
      }
  }

  addEventMarkerDetail(){
    
    this.markers.map(marker => {
      google.maps.event.addListener(marker, 'click', () => {
        console.log(marker.title);
        this.ngZone.run(()=>{
          this.markerClicked++;
          for(let i = 0 ; i < this.siteData.length ; i++){
            this.selectedSite = this.siteData[i];
            this.goToDetail();
        }
       });

      })
    });
  }

  hideDetailScreen(){

    this.markerClicked++;
    if(this.markerClicked == 2){
      console.log('google marker clicked');
      
      
    }else{
      if(this.moreDetailStatus){
        this.goBackDiscover();
      }
      console.log('google map clicked');
    }
    this.markerClicked = 0;
  }

  clearMapCluster(){
    this.markerClusterer  = this.mapCluster.clearCluster(this.markerClusterer);
  }

  loadSiteTempData(){
    this.presentLoading();
    let temp = this.defaultSearchText;
    if(this.searchFlag){
      temp = this.searchText;
    }
    this.searchFlag = false;

    for(let i = 0; i < this.siteData.length; i++){
      this.siteData[i]['lat'] = this.siteData[i]['latitude'];
      this.siteData[i]['lng'] = this.siteData[i]['longitude'];
      let savedSitestr = localStorage.getItem("saved_sites");
      if(savedSitestr != null && savedSitestr != ''){
        if(savedSitestr.indexOf(this.siteData[i].siteGuid) != -1){
          this.siteData[i]['saved'] = true;
        }else{
          this.siteData[i]['saved'] = false;
        }
      }else{
        this.siteData[i]['saved'] = false;
      }

    }
    if(this.siteData != null){
      this.searchResultText = "SEARCH RESULT: " + "Found " + this.siteData.length + " locations";
      // let mpLat = this.siteData[0].latitude;
      // let mpLng = this.siteData[0].longitude;
      let mpLat = 26.00;
      let mpLng = -81.15;
      this.loadMapCluster(mpLat, mpLng, 10);
    }
        
  }

  loadSitesData(){
    this.presentLoading();
    let temp = this.defaultSearchText;
    if(this.searchFlag){
      temp = this.searchText;
    }
    this.searchFlag = false;
    if(this.vb_token == ""){
        this.vb_token = localStorage.getItem("vb_token");
    }

    if(this.vb_token != null && this.vb_token != ""){
      this.api.getSiteMain(temp, this.searchRadius, this.vb_token)
      .then(({data}) => {
        if(data != ""){
          this.siteData = data;
          for(let i = 0; i < this.siteData.length; i++){
            this.siteData[i]['lat'] = this.siteData[i]['latitude'];
            this.siteData[i]['lng'] = this.siteData[i]['longitude'];
            let savedSitestr = localStorage.getItem("saved_sites");
            if(savedSitestr != null && savedSitestr != ''){
              if(savedSitestr.indexOf(this.siteData[i].siteGuid) != -1){
                this.siteData[i]['saved'] = true;
              }else{
                this.siteData[i]['saved'] = false;
              }
            }else{
              this.siteData[i]['saved'] = false;
            }
    
          }
          if(this.siteData != null){
            this.searchResultText = "SEARCH RESULT: " + "Found " + this.siteData.length + " locations";
            let mpLat = this.siteData[0].latitude;
            let mpLng = this.siteData[0].longitude;
            this.loadMapCluster(mpLat, mpLng, 10);
          }
        }else{
          this.siteData = [];
          this.searchResultText = "SEARCH RESULT: Found 0 locations";
          if(this.map != null){
            this.clearMapCluster();
          }else{
            this.loadMap();
          }
        }

      })
      .catch((e) => {
        console.log(e);
        this.siteData = [];
        this.searchResultText = "SEARCH RESULT: Found 0 locations";
        this.loadMap();
      });
    }else{
      this.api.getValidToken().then(({data}) => {
        this.vb_token = data;
        localStorage.setItem("vb_token", data);
        this.api.getSiteMain(temp, this.searchRadius, this.vb_token)
        .then(({data}) => {
          if(data != ""){
            this.siteData = data;
            for(let i = 0; i < this.siteData.length; i++){
              this.siteData[i]['lat'] = this.siteData[i]['latitude'];
              this.siteData[i]['lng'] = this.siteData[i]['longitude'];
              let savedSitestr = localStorage.getItem("saved_sites");
              if(savedSitestr != null && savedSitestr != ''){
                if(savedSitestr.indexOf(this.siteData[i].siteGuid) != -1){
                  this.siteData[i]['saved'] = true;
                }else{
                  this.siteData[i]['saved'] = false;
                }
              }else{
                this.siteData[i]['saved'] = false;
              }
      
            }
            if(this.siteData != null){
              this.searchResultText = "SEARCH RESULT: " + "Found " + this.siteData.length + " locations";
              let mpLat = this.siteData[0].latitude;
              let mpLng = this.siteData[0].longitude;
              this.loadMapCluster(mpLat, mpLng, 10);
            }            
          }
          else{
            this.siteData = [];
            this.searchResultText = "SEARCH RESULT: Found 0 locations";
            this.loadMapCluster(this.currentLocation.lat, this.currentLocation.lng, 9);
          }
        })
        .catch((e) => {
          console.log(e);
          this.siteData = [];
          this.searchResultText = "SEARCH RESULT: Found 0 locations";
          this.loadMapCluster(this.currentLocation.lat, this.currentLocation.lng, 9);
        });
      }).catch(e => {
        console.log(e);
        this.loadMapCluster(this.currentLocation.lat, this.currentLocation.lng, 9);
      })
    }
  }

  footerExpanded() {
    console.log('Footer expanded!');
  }

  // optional capture events
  footerCollapsed() {
    console.log('Footer collapsed!');
  }

  // toggle footer states
  toggleFooter(siteData) {
    if(siteData != ''){
      this.selectedSite = siteData;
    }
    this.pullUpToolBarStatus = true;
    this.footerState = this.footerState === IonPullUpFooterState.Collapsed ? IonPullUpFooterState.Expanded : IonPullUpFooterState.Collapsed;
  }

  goToDetail() {

    this.moreDetailStatus = true;
    this.pullUpToolBarStatus = false;

  }

  goBackDiscover() {
    
    this.moreDetailStatus = false;
    console.log("test");
  }

  enableLocation() {

    this.getMyLocation();
  }

  async getMyLocation() {
    const hasPermission = await this.locationService.checkGPSPermission();
    if (hasPermission) {
      if (Capacitor.isNativePlatform) {
        const canUseGPS = await this.locationService.askToTurnOnGPS();
        this.postGPSPermission(canUseGPS);
      }
      else { this.postGPSPermission(true); }
    }
    else {
      const permission = await this.locationService.requestGPSPermission();
      if (permission === 'CAN_REQUEST' || permission === 'GOT_PERMISSION') {
        this.locationEnabled = true;
        if (Capacitor.isNativePlatform) {
          
          const canUseGPS = await this.locationService.askToTurnOnGPS();
          this.postGPSPermission(canUseGPS);
        }
        else { this.postGPSPermission(true); }
      }
      else {
        this.locationEnabled = false;
        this.toast.show('User denied location permission', '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }
    }
  }

  async postGPSPermission(canUseGPS: boolean) {
    if (canUseGPS) { this.watchPosition(); }
    else {
      this.toast.show('Please turn on GPS to get the location.', '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    }
  }

  async watchPosition() {
    try {
      let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
        if("coords" in data){
          this.locationEnabled = true;
          this.lat = data.coords.latitude;
          this.lng = data.coords.longitude;

          this.currentLocation.lat = data.coords.latitude;
          this.currentLocation.lng = data.coords.longitude;
          this.zoomSize = 8;
          if(this.lat == null){
            console.log("test");
            // this.loadMapCluster(this.lat, this.lng, this.zoomSize);
          }
        }else{
          console.log("postion error");
        }
      });
    }
    catch (err) { console.log('err', err) }
  }
  searchSites(){
    if(this.searchText != ''){
      this.searchFlag = true;
      this.searchOriginal = false;
      this.loadSitesData();
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 5000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  saveSite(site, saved){

    for(let i = 0; i < this.siteData.length; i++){
      if(this.siteData[i].siteGuid.indexOf(site.siteGuid) != -1){
        this.siteData[i].saved = saved;
      }
    }

    if(this.selectedSite.siteGuid.indexOf(site.siteGuid) != -1){
      this.selectedSite.saved = saved;
    }

    let savedStr = localStorage.getItem("saved_sites");

    if(saved){
      if(savedStr != null && savedStr != ''){
        let savedJson = JSON.parse(savedStr);
        savedJson.push(site);
        localStorage.setItem("saved_sites", JSON.stringify(savedJson));
      }else{
        let savedJSON = [];
        savedJSON.push(site);
        localStorage.setItem("saved_sites", JSON.stringify(savedJSON));
      }

    }else{
      let savedJson = JSON.parse(savedStr);
      savedJson = savedJson.filter((el) => {
        return el.siteGuid !== site.siteGuid;
      });
      localStorage.setItem("saved_sites", JSON.stringify(savedJson));

    }
  }

  updateSearch(){
    if(this.searchText == ''){
      this.searchFlag = false;
      this.searchOriginal = true;
     
    }
  }

  callInfo(){
    this.callNumber.callNumber("1" + this.replaceAll(this.selectedSite.rlmPhone, '-', ''), true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }

  replaceAll(str, find, replace) {
    var escapedFind=find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return str.replace(new RegExp(escapedFind, 'g'), replace);
  }

  async shareInfo(site){
    if(site != ''){
      this.selectedSite = site;
    }
    await Share.share({
      title: 'Vertical Bridge',
      text: "Site Name:" + this.selectedSite.siteName + ", Site Num:" + this.selectedSite.newSiteNo,
      url: 'https://verticalbridge.com/',
      dialogTitle: 'Share with friends',
    });
  }

  showDirection(site){
    if(site != ''){
      this.selectedSite = site;
    }
    let dest = {
      lat: this.selectedSite.latitude,
      lng: this.selectedSite.longitude
    }
    this.mapCluster.calculateAndDisplayRoute(this.directionDisplay, this.directionService, this.currentLocation, dest);
  }
}

