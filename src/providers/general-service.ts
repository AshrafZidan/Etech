import { sessionData } from './../pages/shared/session-data';
import { setting } from './../app/setting';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PatientServices provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class GeneralService {

  constructor(public http: Http) {
    console.log('Hello GeneralService Provider');
  }


  // ///////////////////////////start product section ////////////////////////////

  // getProduct(lang: string, currency: string): Observable<any> {
   
  //   return this.http.get(setting.DOMAIN_URL + 'products?'+'language='+lang+'&currency='+currency,
  //    { headers: setting.getHeaderJsonWithTKN() })
  //     .map(res => {
  //       return res.json();
  //     }).timeout(40000);
  //   ;
  // }


  // ///////////////////////////end product section ////////////////////////////





}





