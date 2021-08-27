import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Capacitor } from "@capacitor/core";
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {

  constructor(public platform: Platform) { }

  isOnline(): boolean {
    if(Capacitor.isNativePlatform && Network.Connection){
      return true;
    } else {
      return navigator.onLine;
    }
  }

  isOffline(): boolean {
    if(Capacitor.isNativePlatform && Network.Connection){
      return false;
    } else {
      return !navigator.onLine;
    }
  }

  watchOnline(): Observable<any> {
    return Network.onConnect();
  }

  watchOffline(): Observable<any> {
    return Network.onDisconnect();
  }
}
