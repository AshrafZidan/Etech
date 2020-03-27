import { sessionData } from './../../pages/shared/session-data';
import { setting } from './../../app/setting';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the CategoriesServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CategoriesServiceProvider {

  constructor(public http: Http) {
    console.log('Hello CategoriesServiceProvider Provider');
  }

   // get categories
   getUserById(lang:string): Observable<any> {
    return this.http.get(setting.DOMAIN_URL + 'categories?'+'language='+lang,
      { headers: setting.getHeaderJsonGetMethod() })
      .map(res => {
        return res.json();
      }).timeout(40000);

  }


   // get categories Variations
   Variations(categoryId:number): Observable<any> {
    return this.http.get(setting.DOMAIN_URL + 'variations?'+'category_id='+categoryId,
      { headers: setting.getHeaderJsonGetMethod() })
      .map(res => {
        return res.json();
      }).timeout(40000);

  }


  filter(ids,options,language:string,currency:string): Observable<any> {
    let data = {
      "id":ids,
      "options":options,
      "language": language,
      "currency":currency
    };
    return this.http.post(setting.DOMAIN_URL + 'filter', data, 
      { headers: setting.getHeaderJsonGetMethod() })
      .map(res => {
        return res.json();
      }).timeout(40000);

  }

}
