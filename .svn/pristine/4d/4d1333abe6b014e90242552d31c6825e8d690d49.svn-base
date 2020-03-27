import { sessionData } from './../shared/session-data';
import { ProductsServiceProvider } from './../../providers/products-service/products-service';
import { TranslateService } from '@ngx-translate/core';
import { MyApp } from './../../app/app.component';
import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';

/**
 * Generated class for the PaymentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  public total : number=0;

  // service parameter
  public productId: any = [];
  public quantities: any = [];
  public productPrice: any = [];
  public paymentCheck: number = 1;

  public getPaymentItem: any = [];
  public pleaseWait: string = null;
  public quintity:any=[];
  public price: any = 0;
  public address_id;
  currentSymbol;

  constructor(platform: Platform, public navCtrl: NavController,
    public navParams: NavParams, public app: MyApp,
    public translate: TranslateService,
    public ProductsService: ProductsServiceProvider,
    public toastCtrl: ToastController,
    private loading: LoadingController,
    private payPal: PayPal

  ) {

    this.currentSymbol = localStorage.getItem('currencySymbol');

    platform.registerBackButtonAction(() => {
      this.app.openPage('ShipAddressPage');
    });
    this.translate.get(['pleaseWait']).subscribe((res) => {
      this.pleaseWait = res.pleaseWait;
    });

    if (this.navParams.get('carts') == undefined || this.navParams.get('price') == undefined || this.navParams.get('quentity')==undefined) {
      this.getPaymentItem = [];
      this.price = 0;
    }
    else {
      this.quintity = this.navParams.get('quentity');

      this.getPaymentItem = this.navParams.get('carts');
      this.price = this.navParams.get('price');
      this.address_id =this.navParams.get('address_id') ;
    }



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }
  back() {
    this.app.openPage('ShipAddressPage');
  }

  getRadioValue(e: any) {
    var credit = document.getElementById('cerdit-div');

    if (e == 'c') {
      credit.classList.add('show');

    } else {
      credit.classList.remove('show');

    }
  }


  // payment
  paymentMethods() {

    if (this.getPaymentItem.length != 0) {
      let loading = this.loading.create({
        content: this.pleaseWait
      });
      loading.present();




      let option = [];
      var obj = {
        "field_id":0,
        "value": "",
             "price": 0,
        "product_id":0
       }
      for (let i = 0; i < this.getPaymentItem.length; i++) {
        this.productId.push(parseInt(this.getPaymentItem[i].id))
        console.log(this.quintity[i] , " iiiiiiiii");

        this.quantities.push(parseInt(this.quintity[i]))
        this.productPrice.push(parseInt(this.getPaymentItem[i].price))

          for (let j = 0; j < this.getPaymentItem[i].variations.length; j++) {
            const element = this.getPaymentItem[i].variations[j];
            obj = {
              "field_id": parseInt(element.field_id ),
              "value": element.value,
              "price": parseFloat(element.price),
             "product_id": parseInt(element.product_id)
            }
            option.push(obj)
          }

      }




console.log(this.paymentCheck);

if (this.paymentCheck == 1) {
  loading.dismiss();
this.productPrice.forEach(element => {
  this.total  =  this.total + element ;
});
console.log( this.total);
this.paidbypaypal(this.total,option);

}else{

      this.ProductsService.paymentOrder(sessionData.currency,this.productId, this.quantities, this.productPrice , this.paymentCheck, this.address_id , option ," " ).subscribe( data => {
            if(data.Status == true){
              this.presentToast(data.Message);

              localStorage.removeItem('carts');
              this.app.openPage('HomePage');

          }else{
              this.presentToast(data.Message);
              this.app.openPage('CartPage');
            }

            loading.dismiss();
          }
          , error => {
            sessionData.clearDateFromLocalStorage();
            this.app.openPage('LoginPage')
            loading.dismiss();

          });
        }
      }




  }

  // toast
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 1800,
      position: 'top'
    });
    toast.present();
  }




paidbypaypal(total,option){

  this.payPal.init({
    PayPalEnvironmentProduction: 'AXdae9YYskTsJRnwzwUyDYqhgtISFRHlTjmIXFaFbu3UEgFl_0LC2lG734jx3naKB6xS52yV0jgpm5nt',
    PayPalEnvironmentSandbox: 'AVS4Fvp1y59RAaAx-PN_sZuIBrLWd5NrGGnwNoVRAEU2JuMQbo5MtKH_HiefM9f6cPcHE5tB9xPBILwY'
  }).then(() => {
    // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
    this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
      // Only needed if you get an "Internal Service Error" after PayPal login!
      //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
    })).then(() => {
      let payment = new PayPalPayment(total, sessionData.currency, 'Description', 'sale');
      this.payPal.renderSinglePaymentUI(payment).then(() => {
        // Successfully paid
        this.ProductsService.paymentOrder(sessionData.currency,this.productId, this.quantities, this.productPrice , this.paymentCheck, this.address_id , option ," " ).subscribe( data => {
          if(data.Status == true){
            this.presentToast(data.Message);

            localStorage.removeItem('carts');
            this.app.openPage('HomePage');

        }else{
            this.presentToast(data.Message);
            this.app.openPage('CartPage');
          }

        }
        , error => {
          sessionData.clearDateFromLocalStorage();
          this.app.openPage('LoginPage')

        });


        // Example sandbox response
        //
        // {
        //   "client": {
        //     "environment": "sandbox",
        //     "product_name": "PayPal iOS SDK",
        //     "paypal_sdk_version": "2.16.0",
        //     "platform": "iOS"
        //   },
        //   "response_type": "payment",
        //   "response": {
        //     "id": "PAY-1AB23456CD789012EF34GHIJ",
        //     "state": "approved",
        //     "create_time": "2016-10-03T13:33:33Z",
        //     "intent": "sale"
        //   }
        // }
      }, () => {
        // Error or render dialog closed without being successful
      });
    }, () => {
      // Error in configuration
    });
  }, () => {
    // Error in initialization, maybe PayPal isn't supported or something else
  });

}














}
