import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ConnectivityService } from './connectivity.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  currentMarker: any;
  apiKey: string;
  constructor(public connectivityService: ConnectivityService, private geolocation: Geolocation) { }

  init(mapElement: any, pleaseConnect: any): Promise<any> {
    this.apiKey = "AIzaSyA492dXWIuc-FPSzjsl2FfUYvWOjD6GKXM";
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;

    return this.loadGoogleMaps();

  }

  
  update(lat, lng, zoom, mapElement: any, pleaseConnect: any): Promise<any> {
    this.apiKey = "AIzaSyA492dXWIuc-FPSzjsl2FfUYvWOjD6GKXM";
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;

    return this.updateGoogleMaps(lat, lng, zoom);

  }

  updateGoogleMaps(lat, lng, zoom): Promise<any> {

    return new Promise((resolve) => {

      if(typeof google == "undefined" || typeof google.maps == "undefined"){

        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();

        if(this.connectivityService.isOnline()){

          window['mapInit'] = () => {

            this.updateMap(lat, lng, zoom).then((map) => {
              resolve(map);
            });

            this.enableMap();
          }

          let script = document.createElement("script");
          script.id = "googleMaps";

          if(this.apiKey){
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
          }

          document.body.appendChild(script);

        }
      }
      else {

        if(this.connectivityService.isOnline()){
          this.updateMap(lat, lng, zoom);
          this.enableMap();
        }
        else {
          this.disableMap();
        }

      }

      this.addConnectivityListeners();

    });

  }

  loadGoogleMaps(): Promise<any> {

    return new Promise((resolve) => {

      if(typeof google == "undefined" || typeof google.maps == "undefined"){

        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();

        if(this.connectivityService.isOnline()){

          window['mapInit'] = () => {

            this.initMap().then((map) => {
              resolve(map);
            });

            this.enableMap();
          }

          let script = document.createElement("script");
          script.id = "googleMaps";

          if(this.apiKey){
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
          }

          document.body.appendChild(script);

        }
      }
      else {

        if(this.connectivityService.isOnline()){
          this.initMap();
          this.enableMap();
        }
        else {
          this.disableMap();
        }

      }

      this.addConnectivityListeners();

    });

  }

  initMap(): Promise<any> {

    this.mapInitialised = true;

    return new Promise((resolve) => {
      
      this.geolocation.getCurrentPosition().then((position) => {

        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        // let latLng = new google.maps.LatLng(-31.563910, 147.154312);

        let mapOptions = {
          center: latLng,
          zoom: 8,
          mapTypeId: null,
          disableDefaultUI: true,
          zoomControl: false
        }

        this.map = new google.maps.Map(this.mapElement, mapOptions);
        resolve(this.map);

      });

    });

  }

  updateMap(latVal,lngVal, zoomVal): Promise<any> {
    this.mapInitialised = true;

    return new Promise((resolve) => {
      
        let latLng = new google.maps.LatLng(latVal, lngVal);

        let mapOptions = {
          center: latLng,
          zoom: zoomVal,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          zoomControl: false,
          mapTypeControl: false
        }

        this.map = new google.maps.Map(this.mapElement, mapOptions);
        resolve(this.map);

    });
  }

  disableMap(): void {

    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "none";
    }

  }

  enableMap(): void {

    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "none";
    }
  }

  addConnectivityListeners(): void {

    this.connectivityService.watchOnline().subscribe(() => {

      console.log("online");

      setTimeout(() => {

        if(typeof google == "undefined" || typeof google.maps == "undefined"){
          this.loadGoogleMaps();
        }
        else {
          if(!this.mapInitialised){
            this.initMap();
          }

          this.enableMap();
        }

      }, 2000);

    });

    this.connectivityService.watchOffline().subscribe(() => {

      console.log("offline");

      this.disableMap();

    });

  }
}
