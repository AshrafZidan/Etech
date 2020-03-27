import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// General Classes /////////////////////////////////////////////
import { setting } from './../app/setting';



/*
  Generated class for the AuthentcationServices provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthentcationServices {


  constructor(public http: Http) {
  }


  userLogin(email: string, password: string): Observable<any> {
    let data = {
      "email": email,
      "password": password
    };
    return this.http.post(setting.DOMAIN_URL + 'authenticate', data, { headers: setting.getHeaderJson() })
      .map(res => {
        return res.json();
      }).timeout(40000);
    ;
  }
  /////////////////////////////////////////////////////////////////////////////////////////
  userSignUp(firstname: string, lastname: string, email: string, password: string, categories: Array<number>): Observable<any> {
    let data = {
      "first_name": firstname,
      "last_name": lastname,
      "email": email,
      "password": password,
      "categories": categories,
    };

    return this.http.post(setting.DOMAIN_URL + 'register', data, { headers: setting.getHeaderJson() })
      .map(res => {
        return res.json();
      }).timeout(40000);
  }

  /////////////////////////////////////////////////////////////////////////////

  forgetPassword(email: string): Observable<any> {
    let body = new FormData();
    body.append('email', email);
    return this.http.post(setting.DOMAIN_URL + 'forget-password', body,
      { headers: setting.getHeaderJsonFormData() })
      .map(res => {
        return res.json();
      }).timeout(40000);
  }


  changePassword(currentPass: string, newPass: string): Observable<any> {
    let body = new FormData();
    body.append('old_password', currentPass);
    body.append('new_password', newPass);
    return this.http.post(setting.DOMAIN_URL + 'change-password', body,
      { headers: setting.getHeaderJsonGetMethod() })
      .map(res => {
        return res.json();
      }).timeout(40000);
  }


  userVerifyCode(verifyCode: string, userName: string, password: string, userId: number, browserType: string, osType: string, language: string): Observable<any> {
    let data = {
      "userName": userName,
      "password": password,
      "deviceType": "mobile",
      "browserType": browserType,
      "osType": osType,
      "timeZone": "GMT+0200",
      "language": language,
      "location": "Egypt",
      "notificationId": "none",
      "isMobileApp": true
    };
    return this.http.put(setting.DOMAIN_URL + '/userservices/mobilevalidate?userid=' + userId + '&verifycode=' + verifyCode, data, { headers: setting.getHeaderJson() })
      .map(res => {
        return res.json();
      }).timeout(40000);
  }
  ResendCode(userId: number): Observable<any> {
    return this.http.get(setting.DOMAIN_URL + '/userservices/resendcode?userid=' + userId)
      .map(res => {
        return res.json();
      }).timeout(40000);
  }
  requestForgetPassword(userPhone: string): Observable<any> {
    return this.http.get(setting.DOMAIN_URL + '/userservices/requestresetpassword?username=' + userPhone)
      .map(res => {
        return res.json();
      }).timeout(40000);
  }

  /////////////////////////////////////////////////////////////////////////////////////////
  // forgetPassword(userPhone: string, password: string, verifyCode: string): Observable<any> {
  //   let data = new URLSearchParams();
  //   data.set('newpassword', password);
  //   let body = data.toString()
  //   return this.http.post(setting.DOMAIN_URL + '/userservices/resetpassword?verifycode=' + verifyCode + '&username=' + userPhone, body, { headers: setting.getHeaderXWFORM() })
  //     .map(res => {
  //       return res.json();
  //     }).timeout(40000);
  // }
  /////////////////////////////////////////////////////////////////////////////////////////
  logOut(): Observable<any> {
    let options = new RequestOptions({ headers: setting.getHeaderJsonGetMethod() });

    return this.http.post(setting.DOMAIN_URL + 'logout', null, options)
      .map(res => {
        return res.json();
      }).timeout(40000);
  }

  /////////////////////////////////////////////////////////////////////////////////////////
  validateSession(): Observable<any> {
    let options = new RequestOptions({ headers: setting.getHeaderJsonWithTKN() });
    console.log(options);

    return this.http.post(setting.DOMAIN_URL + '/usersessionservices/validatesession', null, options)
      .map(res => {
        return res.json();
      }).timeout(40000);
  }


  /////////////////////////////////////////////////////////////////////////////////////////
  deactivateAccount(): Observable<any> {
    return this.http.post(setting.DOMAIN_URL + '/userservices/deactivateuser', null, { headers: setting.getHeaderJsonWithTKN() })
      .map(res => {
        return res.json();
      }).timeout(40000);
  }

  getVersionMobile(version: string): Observable<any> {
    return this.http.get(setting.DOMAIN_URL + '/userservices/mobileversion?ver=' + version)
      .map(res => {
        return res.json();
      }).timeout(40000);
  }

  updateLanguage(language): Observable<any> {

    return this.http.post(setting.DOMAIN_URL + '/usersessionservices/updateusersession?lan=' + language, null, { headers: setting.getHeaderJsonWithTKN() })
      .map(res => {
        return res.json();
      }).timeout(40000);
  }


}
