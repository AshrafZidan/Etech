
import { sessionData } from './../../pages/shared/session-data';
import { setting } from './../../app/setting';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

/*
  Generated class for the ProductsServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ProductsServiceProvider {

  constructor(public http: Http) {
    console.log('Hello ProductsServiceProvider Provider');
  }


  // ///////////////////////////start product section ////////////////////////////

  // get all products
  getAllProduct(lang: string, currency: string , dataCounter:number) : Observable<any> {

    return this.http.get(setting.DOMAIN_URL + 'products?' + 'language=' + lang + '&currency=' + currency + '&page=' + dataCounter,
      { headers: setting.getHeaderJsonWithTKN() })
      .map(res => {
        return res.json();
      })

  }

  getCategoray(): Observable<any> {
    console.log(setting.DOMAIN_URL , ' ')
    return this.http.get(setting.DOMAIN_URL + 'user-categories',
      { headers: setting.getHeaderJsonGetMethod()}).map(res => {
        return res.json();
      }).timeout(40000);

  }


  getCategorayWithouttkn(lang): Observable<any> {

    return this.http.get(setting.DOMAIN_URL + 'all-categories?' + 'language=' + lang,
    { headers: setting.getHeaderJson() }
    )
      .map(res => {
        return res.json();
      }).timeout(40000);

  }


  // get single product
  getSingleProduct(lang: string, currency: string, productid: number): Observable<any> {
    return this.http.get(setting.DOMAIN_URL + 'singleProduct?' + 'language=' + lang + '&currency=' + currency + '&product_id=' + productid,
      { headers: setting.getHeaderJsonGetMethod() })
      .map(res => {
        return res.json();
      }).timeout(40000);

  }

  // get Product Variations
  getProductVariations(productid: number, categoryid: number): Observable<any> {
    return this.http.get(setting.DOMAIN_URL + 'product-variations?' + 'product_id=' + productid + '&category_id=' + categoryid,
      { headers: setting.getHeaderJsonGetMethod() })
      .map(res => {
        return res.json();
      }).timeout(40000);

  }


  // get all orders
  getAllOrders(language:string,currency:string): Observable<any> {
    let data = {
      // "products": products,
      "language": language,
      "currency":currency
    };
    return this.http.post(setting.DOMAIN_URL + 'all-orders-rev' , data, { headers: setting.getHeaderJsonGetMethod2() })
      .map(res => {
        return res.json();
      }).timeout(40000);

  }


   // get all carts
   getAllCart(products:number[],language:string,currency:string): Observable<any> {
    let data = {
      "products": products,
      "language": language,
      "currency":currency
    };
    return this.http.post(setting.DOMAIN_URL + 'cart-items' , data, { headers: setting.getHeaderJsonGetMethod2() })
      .map(res => {
        return res.json();
      }).timeout(40000);

  }


  // get order detials
  getOrdersDetials(language:string,ordernumber:number , currency:string){
    return this.http.get(setting.DOMAIN_URL + 'order-details-rev?' + 'language=' + language +'&order_number=' + ordernumber + '&currency=' + currency,
    { headers: setting.getHeaderJsonGetMethod2() })
    .map(res => {
      return res.json();
    }).timeout(40000);
  }

  // creare order
  Orderproduct(product_id: string, quantity: string): Observable<any> {
    let body = new FormData();
    body.append('product_id', product_id);
    body.append('quantity', quantity);
    return this.http.post(setting.DOMAIN_URL + 'create-order', body,
      { headers: setting.getHeaderJsonGetMethod() })
      .map(res => {
        return res.json();
      }).timeout(40000);
  }


  // search product
  searchProduct(text: string, lang: string, currency: string): Observable<any> {
    return this.http.get(setting.DOMAIN_URL + 'search-products?' + 'text=' + text +'&language=' + lang +  '&currency=' + currency,
      { headers: setting.getHeaderJsonGetMethod() })
      .map(res => {
        return res.json();
      }).timeout(40000);

  }

   // getview-wishlist
   getviewWishlist(currency: string, language: string): Observable<any> {
    return this.http.get(setting.DOMAIN_URL + 'view-wishlist?' + 'currency=' + currency + '&language=' + language,
      { headers: setting.getHeaderJsonGetMethod() })
      .map(res => {
        return res.json();
      }).timeout(40000);

  }

  // remove wish
  removeWish(productId: number): Observable<any> {
    return this.http.get(setting.DOMAIN_URL + 'remove-wish?' + 'product_id=' + productId ,
      { headers: setting.getHeaderJsonGetMethod() })
      .map(res => {
        return res.json();
      }).timeout(40000);

  }
  // creare addWish
  addWish(product_id: string): Observable<any> {
    let body = new FormData();
    body.append('product_id', product_id);
    return this.http.post(setting.DOMAIN_URL + 'add-wish', body,
      { headers: setting.getHeaderJsonGetMethod() })
      .map(res => {
        return res.json();
      }).timeout(40000);
  }
  // ///////////////////////////end product section ////////////////////////////


  // get address shippment
  getAddressShippment(){
    return this.http.get(setting.DOMAIN_URL + 'shippingAddress' ,
    { headers: setting.getHeaderJsonGetMethod2() })
    .map(res => {
      return res.json();
    }).timeout(40000);
  }

  // payment order
  paymentOrder(currency:string ,products:number[],quantities:number[],product_total:number[],paymentType:number,address ,options, comment:string): Observable<any> {
    let data = {
      "currency":currency,
      "product_ids": products,
      "quantities": quantities,
      "product_total": product_total,
      "payment_type": paymentType,
      "address_id":address,
      "options":options,
      "_comment" : comment
    };
    
    return this.http.post(setting.DOMAIN_URL + 'place-order' , data, { headers: setting.getHeaderJsonGetMethod2() })
      .map(res => {
        return res.json();
      }).timeout(40000);

  }

 // get address shippment
 getProductWithcategory(category_id , currency): Observable<any>{
 
  return this.http.get(setting.DOMAIN_URL + 'category-products?currency=' + currency +'&category_id=' +   category_id,
  { headers: setting.getHeaderJsonGetMethod() })
  .map(res => {
    return res.json();
  })
}


  

}
