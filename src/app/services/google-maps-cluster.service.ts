import { Injectable } from '@angular/core';
import * as MarkerClusterer from 'node-js-marker-clusterer';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsClusterService {
  locations: any;
  constructor() {

   }

   addCluster(map , locations){

    if(google.maps){

        //Convert locations into array of markers
        let markers = locations.map((location) => {
            return new google.maps.Marker({
                position: location,
                title: location.siteGuid
            });
        });
        console.log(markers[0].position.lat);

        return new MarkerClusterer(map, markers, {imagePath: 'assets/imgs/m'});
        // map.add(this.markerCluster);
    } else {
        console.warn('Google maps needs to be loaded before adding a cluster');
        return null;
    
    }



}

updateCluster(markerCluster, locations){
    if(google.maps){

        //Convert locations into array of markers

        // let tmpPosArr = [];
        // for(let i = 0 ; i < locations.length; i++){
        //     let tmpPos = new google.maps.Marker();
        //     let latLng = new google.maps.LatLng(locations[i].latitude, locations[i].longitude);
        //     tmpPos.setPosition(latLng);
        //     tmpPos.setLabel(locations[i].rlmName);
        //     tmpPosArr.push(tmpPos);
        //     console.log(tmpPos.getPosition());
        // }
        let markers = locations.map((location) => {
            
            return new google.maps.Marker({
                position: location,
                title: location.siteGuid
            });


        });

        markerCluster.addMarkers(markers);
        // markerCluster = new MarkerClusterer(map, markers, {imagePath: 'assets/imgs/m'});
        // map.add(this.markerCluster);
    
        return markerCluster;
    } else {
        console.warn('Google maps needs to be loaded before adding a cluster');
    
    }
}

clearCluster(markerCluster){
    if(google.maps){
        markerCluster.clearMarkers();
        return markerCluster;
    }
}

getDirectionDisplay(map){
    if(google.maps){
        let directionDisplay = new google.maps.DirectionsRenderer;
        directionDisplay.setMap(map);

        return directionDisplay;
    }
}

getDirectionService(){
    if(google.maps){
        return new google.maps.DirectionsService;
    }
}

calculateAndDisplayRoute(directionDisplay: google.maps.DirectionsRenderer, directionService: google.maps.DirectionsService, origin, dest){
    if(google.maps){     
        directionService.route({
            origin: origin,
            destination: dest,
            travelMode: google.maps.TravelMode.DRIVING
            },
            (response, status) => {
                if(status === 'OK'){
                    directionDisplay.setDirections(response);
                }else{
                    console.log("Direction request failed due to" + status);
                }
            }
        );
    }
}


}
