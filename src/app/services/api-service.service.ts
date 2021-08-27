import { Injectable } from '@angular/core';
import { Http } from '@capacitor-community/http';

@Injectable({
  providedIn: 'root'
})



export class ApiServiceService {
  endpoint = 'https://vbconnectorapi-apim.azure-api.net/';

  constructor() { }

   async getToken(username, pwd){
     let tokenParam = {
      UserName: "OnlineColo",
      Password: "0nl1n3C010!!!!"
    };
    return await Http.request({
      method: 'POST', 
      headers: {
        'content-type': 'application/json',
        'Ocp-Apim-Subscription-Key' : 'c730a7335787484d90a6d51c4abb2cbf'
      },
      url: this.endpoint + "vbconnectorapi/Auth/CreateToken",
      data: tokenParam
      
    })
    .then(({data}) => {
      console.log(data);
      localStorage.setItem("vb_token", data);
    })
    .catch(e => {
      console.log(e);
    })
  }

  async getValidToken(){
    let tokenParam = {
      UserName: "OnlineColo",
      Password: "0nl1n3C010!!!!"
    };
    return await Http.request({
      method: 'POST', 
      headers: {
        'content-type': 'application/json',
        'Ocp-Apim-Subscription-Key' : 'c730a7335787484d90a6d51c4abb2cbf'
      },
      url: this.endpoint + "vbconnectorapi/Auth/CreateToken",
      data: tokenParam
      
    })
  }


  async getUserRole(userEmail){
    const vb_token = localStorage.getItem("vb_token");
    return await Http.request({
      method: 'GET', 
      headers: {
        'Authorization': 'Bearer ' + vb_token,
        'Ocp-Apim-Subscription-Key' : 'c730a7335787484d90a6d51c4abb2cbf'
      },
      params: {UserEmailAddress: 'RCassell@verticalbridge.com'},
      url: this.endpoint + "OnlineColo/GetUserRoles",
      
    })
    .then(({data}) => {
      console.log(data);
     
      localStorage.setItem("app_user_id", data.applicationUserId);
      localStorage.setItem("role", data.userRoleNames[0]);
    })
    .catch(e => {
      console.log(e);
    })
  }

  async getSiteMain(searchText, radius, vb_token){

    return await Http.request({
      method: 'GET', 
      headers: {
        'Authorization': 'Bearer ' + vb_token,
        'Ocp-Apim-Subscription-Key' : 'c730a7335787484d90a6d51c4abb2cbf'
      },
      params: {SearchString : searchText, searchRadius: radius},
      url: this.endpoint + "api/siteLocator/GetSitesMain",
      
    });
  }

  
  async getSitesByLocation(lat, long, radius){
    const vb_token = localStorage.getItem("vb_token");
    return await Http.request({
      method: 'GET', 
      headers: {
        'Authorization': 'Bearer ' + vb_token,
        'Ocp-Apim-Subscription-Key' : 'c730a7335787484d90a6d51c4abb2cbf'
      },
      params: {Latitude : lat, searchRadius: radius, Longitude: long, siteNumber: 'US-FL-1001'},
      url: this.endpoint + "SiteLocator/GetSitesByLatLongRadius",
      
    });
  }

  async getNearBySites(site_num, radius){
    const vb_token = localStorage.getItem("vb_token");
    return await Http.request({
      method: 'GET', 
      headers: {
        'Authorization': 'Bearer ' + vb_token,
        'Ocp-Apim-Subscription-Key' : 'c730a7335787484d90a6d51c4abb2cbf'
      },
      params: {siteNumber : site_num, searchRadius: radius},
      url: this.endpoint + "SiteLocator/GetNearbySites",
      
    })
    .then(({data}) => {
      console.log(data);

    })
    .catch(e => {
      console.log(e);
    })
  }

  async getSitesByPostalCode(postal_code){
    const vb_token = localStorage.getItem("vb_token");
    return await Http.request({
      method: 'GET', 
      headers: {
        'Authorization': 'Bearer ' + vb_token,
        'Ocp-Apim-Subscription-Key' : 'c730a7335787484d90a6d51c4abb2cbf'
      },
      params: {postalCode : postal_code},
      url: this.endpoint + "SiteLocator/GetSitesByPostalCode",
      
    })
    .then(({data}) => {
      console.log(data);

    })
    .catch(e => {
      console.log(e);
    })
  }

}
