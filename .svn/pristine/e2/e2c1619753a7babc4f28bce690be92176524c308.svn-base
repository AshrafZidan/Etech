import { TranslateService } from '@ngx-translate/core';
import { ProductsServiceProvider } from './../../providers/products-service/products-service';
import { sessionData } from './../shared/session-data';
import { MyApp } from './../../app/app.component';
import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams, ToastController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the AllOrdersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-all-orders',
  templateUrl: 'all-orders.html',
})
export class AllOrdersPage {
  Arr = Array; //Array type captured in a variable
  public pleaseWait: string = null;
  public symbol; 

  public orderArray:any=[];

  constructor(
    public App:MyApp ,
    public navCtrl: NavController
    ,platform: Platform,
    private loading: LoadingController,

    public navParams: NavParams,
    public translate: TranslateService,
    public ProductsService: ProductsServiceProvider,
    public toastCtrl: ToastController

    ) {
      this.navCtrl = navCtrl;
      platform.registerBackButtonAction(() => {
        this.App.openPage('HomePage');
      });
      this.translate.use(sessionData.language);

      this.translate.get(['pleaseWait']).subscribe((res) => {
        this.pleaseWait = res.pleaseWait;
      });
      this.symbol = localStorage.getItem('currencySymbol');

    

      this.getAllOrders();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllOrdersPage');
  }

  back() {

    this.App.openPage('HomePage');
  }

  openDetialsOrderPage(namePage,order){
    // console.log(order_number);
    
    this.navCtrl.push(namePage,{orderDetail:order});
  }

// get all orders
  getAllOrders() {
    let loading = this.loading.create({
      content: this.pleaseWait
    });
    loading.present();
    let product=[14]
    this.ProductsService.getAllOrders( sessionData.language,sessionData.currency).subscribe(
      data => {
        console.log("sss: ", data)
        if(data.length>0){
          this.orderArray = data;

        }else{
          this.orderArray = [];

        }
        
        loading.dismiss();
      }
      , error => {
        // console.log("sss: ",error)
        sessionData.clearDateFromLocalStorage();
        this.App.openPage('LoginPage')
        loading.dismiss();

      });
  }


}
