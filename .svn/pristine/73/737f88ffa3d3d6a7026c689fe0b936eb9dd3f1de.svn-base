import { TranslateService } from '@ngx-translate/core';
import { ProductsServiceProvider } from './../../providers/products-service/products-service';
import { sessionData } from './../shared/session-data';
import { MyApp } from './../../app/app.component';
import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

/**
 * Generated class for the OrderDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-details',
  templateUrl: 'order-details.html',
})
export class OrderDetailsPage {
  public pleaseWait: string = null;
  public getorder: any;
  public orderDetials: any;
  public symbol; 

  constructor(platform: Platform, public navCtrl: NavController,
    public navParams: NavParams, public app: MyApp,
    private loading: LoadingController,

    public translate: TranslateService,
    public ProductsService: ProductsServiceProvider,
    public toastCtrl: ToastController

  ) {

    platform.registerBackButtonAction(() => {
      this.app.openPage('AllOrdersPage');
    });
    this.translate.get(['pleaseWait']).subscribe((res) => {
      this.pleaseWait = res.pleaseWait;
    });
    this.translate.use(sessionData.language);

    this.getorder = this.navParams.get("orderDetail");
    this.symbol = localStorage.getItem('currencySymbol');



    this.getOrdersDetials();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailsPage');
  }

  back() {

    this.app.openPage('AllOrdersPage');
  }



  // get order details 
  getOrdersDetials() {
    let loading = this.loading.create({
      content: this.pleaseWait
    });
    loading.present();
    this.ProductsService.getOrdersDetials(sessionData.language, this.getorder.order_number , sessionData.currency).subscribe(
      data => {
        this.orderDetials = data.InnerData[0].items;
        
        loading.dismiss();
      }
      , error => {
        // console.log("sss: ",error)
        sessionData.clearDateFromLocalStorage();
        this.app.openPage('LoginPage')
        loading.dismiss();

      });
  }

}
