
import { sessionData } from './../../pages/shared/session-data';
import { setting } from './../../app/setting';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
/*
  Generated class for the ProfileuserServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ProfileuserServiceProvider {

  constructor(public http: Http) {
    console.log('Hello ProfileuserServiceProvider Provider');
  }


  // change account type
  changeAccountType(type: string): Observable<any> {
    return this.http.get(setting.DOMAIN_URL + 'change-account-type?' + 'account_type=' + type,
      { headers: setting.getHeaderJsonGetMethod2() })
      .map(res => {
        return res.json();
      }).timeout(40000);

  }

  // get User profile ById
  getUserById(): Observable<any> {
    return this.http.get(setting.DOMAIN_URL + 'get-user-by-id',
      { headers: setting.getHeaderJsonGetMethod2() })
      .map(res => {
        return res.json();
      }).timeout(40000);

  }
  // get-languages
  getLanguages(): Observable<any> {
    return this.http.get(setting.DOMAIN_URL + 'get-languages',
      { headers: setting.getHeaderJsonGetMethod2() })
      .map(res => {
        return res.json();
      }).timeout(40000);
    ;

  }

  //get-currencies
  getCurrencies(): Observable<any> {
    return this.http.get(setting.DOMAIN_URL + 'get-currencies',
      { headers: setting.getHeaderJsonGetMethod2() })
      .map(res => {
        return res.json();
      }).timeout(40000);

  }

  //get-user-address
  getuseraddress(): Observable<any> {
    return this.http.get(setting.DOMAIN_URL + 'get-user-address',
      { headers: setting.getHeaderJsonGetMethod2() })
      .map(res => {
        return res.json();
      }).timeout(40000);

  }


  //update-address-by-id
  updateaddressbyid(addressId: string,street: string,city: string,zip: number,country: string,phone: number,label: string): Observable<any> {
    let data = {
      address_id: addressId, 
      street_address:street ,
      city: city,
      zip_code: zip,
      country: country,
      phone_number: phone,
      address_label: label
    };
    return this.http.post(setting.DOMAIN_URL + 'update-address-by-id', data, { headers: setting.getHeaderJsonGetMethod2() })
      .map(res => {
        return res.json();
      }).timeout(40000);

  }


  //update-user-language
  updateUserLanguage(addressId: string, newAddress: string, user_id: string, lang: string): Observable<any> {
    let data = {
      "address_id": addressId,
      "new_address": newAddress,
      "user_id": user_id
    };
    return this.http.post(setting.DOMAIN_URL + 'update-user-language?' + 'language=' + lang, data, { headers: setting.getHeaderJsonGetMethod2() })
      .map(res => {
        return res.json();
      }).timeout(40000);

  }

  //update-user-currency
  updateUserCurrency(addressId: string, newAddress: string, user_id: string, currency: string): Observable<any> {
    let data = {
      "address_id": addressId,
      "new_address": newAddress,
      "user_id": user_id
    };
    return this.http.post(setting.DOMAIN_URL + 'update-user-currency?' + 'currency_code=' + currency, data, { headers: setting.getHeaderJsonGetMethod2() })
      .map(res => {
        return res.json();
      }).timeout(40000);

  }


  //addUserAddress
  addUserAddress(street: string,city: string,zip: number,country: string,phone: number,label: string): Observable<any> {
    let data = {
      street_address:street ,
      city: city,
      zip_code: zip,
      country: country,
      phone_number: phone,
      address_label: label
    };
    return this.http.post(setting.DOMAIN_URL + 'add-user-address', data, { headers: setting.getHeaderJsonGetMethod2() })
      .map(res => {
        return res.json();
      }).timeout(40000);

  }

  //deleteAddressById
  deleteAddressById(addressId: string): Observable<any> {
    let data = {
      "address_id": addressId
    };
    return this.http.post(setting.DOMAIN_URL + 'delete-user-address', data, { headers: setting.getHeaderJsonGetMethod2() })
      .map(res => {
        return res.json();
      }).timeout(40000);

  }

  //update-profile
  updateProfile(name: string, password: string): Observable<any> {
    let body = new FormData();
    body.append('name', name);
    body.append('password', password);
    return this.http.post(setting.DOMAIN_URL + 'update-profile', body,
      { headers: setting.getHeaderJsonGetMethod() })
      .map(res => {
        return res.json();
      }).timeout(40000);

  }

}
