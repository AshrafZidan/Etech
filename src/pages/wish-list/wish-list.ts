import { sessionData } from './../shared/session-data';
import { ProductsServiceProvider } from './../../providers/products-service/products-service';
import { TranslateService } from '@ngx-translate/core';
import { MyApp } from './../../app/app.component';
import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, App, LoadingController, AlertController, ToastController } from 'ionic-angular';

/**
 * Generated class for the WishListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wish-list',
  templateUrl: 'wish-list.html',
})
export class WishListPage {
  public pleaseWait: string = null;

  public quentity: number = 1;

  public wishArray: any = [];
  public curr ; 
  symbol;
  
  constructor(platform: Platform, public navCtrl: NavController,
    public navParams: NavParams, public app: MyApp,
    private loading: LoadingController,

    public translate: TranslateService,

    public ProductsService: ProductsServiceProvider,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {
    platform.registerBackButtonAction(() => {
      this.app.openPage('HomePage');
    });

    this.translate.get(['pleaseWait']).subscribe((res) => {
      this.pleaseWait = res.pleaseWait;
    this.curr = sessionData.currency;

    });

    this.symbol = localStorage.getItem('currencySymbol');
    

    this.getWishes();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WishListPage');
  }
  back() {

    this.app.openPage('HomePage');
  }



  // get wishes 
  getWishes() {
    let loading = this.loading.create({
      content: this.pleaseWait
    });
    
    loading.present();
    this.ProductsService.getviewWishlist(sessionData.currency, sessionData.language).subscribe(
      data => {
        console.log("sss: ", data)
        this.wishArray = data.InnerData;
        loading.dismiss();
      }
      , error => {
        // console.log("sss: ",error)
        sessionData.clearDateFromLocalStorage();
        this.app.openPage('LoginPage')
        loading.dismiss();

      });
  }


  // remove wishes
  removeWish(productId) {
    let confirmAlert = this.alertCtrl.create({
      title: 'Are you Sure you want to delete this wish?',
      // message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            let loading = this.loading.create({
              content: this.pleaseWait
            });
            loading.present();
            this.ProductsService.removeWish(productId).subscribe(
              data => {
                this.presentToast(data.Message);

                this.getWishes();
                loading.dismiss();
              }
              , error => {
                // console.log("sss: ",error)
                sessionData.clearDateFromLocalStorage();
                this.app.openPage('LoginPage')
                loading.dismiss();

              });
          }
        },
        {
          text: 'Cancel',
          handler: () => {
          }
        }
      ]
    });
    confirmAlert.present();
  }

  // add to cart
  addToCart(item) {
    let confirmAlert = this.alertCtrl.create({
      title: 'Are you Sure you want to Move this wish to Cart?',
      // message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
      buttons: [
        {
          text: 'OK',
          handler: () => {

              console.log(item);
              
              this.navCtrl.push('SingleProductPage', {
                product: item,
                FromWish:true
              });
            
            // let loading = this.loading.create({
            //   content: this.pleaseWait
            // });
            // loading.present();
            // this.ProductsService.Orderproduct(productId, this.quentity.toString()).subscribe(
            //   data => {
            //     this.presentToast(data.Message);

            //     loading.dismiss();
            //   }
            //   , error => {
            //     // console.log("sss: ",error)
            //     sessionData.clearDateFromLocalStorage();
            //     this.app.openPage('LoginPage')
            //     loading.dismiss();

            //   });
          }
        },
        {
          text: 'Cancel',
          handler: () => {
          }
        }
      ]
    });
    confirmAlert.present();
  }

  // toast
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
