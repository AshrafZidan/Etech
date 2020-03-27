import { ProductsServiceProvider } from './../../providers/products-service/products-service';
import { TranslateService } from '@ngx-translate/core';
import { sessionData } from './../shared/session-data';
import { MyApp } from './../../app/app.component';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, LoadingController, AlertController } from 'ionic-angular';

/**
 * Generated class for the CartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  empty = false;
  public currentNumber = 0;
  public pleaseWait: string = null;

  public total_Prices: number = 0;
  public curr ;
  currentSymbol;

  public allQuentity: any = [];
  public allprices: any = [];
  public allprices_static : any = [];
  public allQuentity_static : any = [];


  
  public cartArray: any = [];
  constructor(public navCtrl: NavController,
    platform: Platform,
    public navParams: NavParams,
    private app: MyApp,
    private loading: LoadingController,
    private alertCtrl: AlertController,

    public translate: TranslateService,
    public ProductsService: ProductsServiceProvider,
    public toastCtrl: ToastController
  ) {

    this.currentSymbol = localStorage.getItem('currencySymbol');

    platform.registerBackButtonAction(() => {
      this.app.openPage('HomePage');
    });

    this.translate.get(['pleaseWait']).subscribe((res) => {
      this.pleaseWait = res.pleaseWait;
    });
    this.getAllCarts();
    this.curr = sessionData.currency ;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');

  }

  back() {
    this.app.openPage('HomePage');
  }



  openPage(namePage) {
    this.app.openPage(namePage);
  }


  // go to address

  goToAddressPage(namePage) {
    localStorage.setItem('cartArrayFromCartPage', JSON.stringify(this.cartArray));
    localStorage.setItem('priceFromCartPage', this.total_Prices+"");

    localStorage.setItem('quentityFromCartPage',  JSON.stringify(this.allQuentity));

    
    this.navCtrl.push(namePage, { carts: this.cartArray, price: this.total_Prices, quentity: this.allQuentity });
  }

  increment(index) {
   

      if ( this.cartArray[index].quantity > this.allQuentity[index] ) {

        this.allQuentity[index] = this.allQuentity[index] + 1;
    
    
        let Price_temp ; 

        
        if ( (this.allQuentity_static[index] ) != 1) {
          Price_temp =  this.allprices_static[index]  ;
          Price_temp =  Price_temp / (this.allQuentity_static[index] );
          
          console.log(Price_temp);
          
        } else {
           Price_temp =  this.allprices_static[index]  ;
        }
    
    
        this.allprices[index] =( this.allprices[index] ) + Price_temp;
        this.cartArray[index].price = this.allprices[index];
    
        this.total_Prices = this.total_Prices+ Price_temp;
      
      } else {
        this.presentToast('Not Avilable in stock')
      }
      
    
  }

  decrement(index) {

      if (this.allQuentity[index] == 1 ) {
        this.allQuentity[index] = 1 ;
      } else {
        
        if (this.allQuentity.length != 0) {
          if (this.allQuentity[index] == 0) {
            this.allQuentity[index] = 0;
          } else {
            this.allQuentity[index] = this.allQuentity[index] - 1;
    
            let Price_temp ; 
        if ( (this.allQuentity_static[index] ) != 1) {
          Price_temp =  this.allprices_static[index]  ;
          Price_temp =  Price_temp / (this.allQuentity_static[index] );
          
        } else {
           Price_temp =  this.allprices_static[index]  ;
        }
    
    
        this.allprices[index] =( this.allprices[index] ) -  Price_temp;
        this.cartArray[index].price = this.allprices[index];
        this.total_Prices = this.total_Prices - Price_temp;
    
          }
    
        }
        else {
          this.allQuentity = [];
        }


        
      }
      
    
  }

  // get all carts
  getAllCarts() {
    let loading = this.loading.create({
      content: this.pleaseWait
    });
    loading.present();
    
    if (JSON.parse(localStorage.getItem('carts')) != null) {
      this.cartArray = JSON.parse(localStorage.getItem('carts'));

      console.log(this.cartArray);
      
        
      for (let i = 0; i < this.cartArray.length; i++) {
        if(this.cartArray[i].price== undefined){
          this.cartArray[i].price=0;
        }

      this.cartArray[i].images= Array.of(this.cartArray[i].images.image);

        this.total_Prices = this.total_Prices + parseInt(this.cartArray[i].price);
        
        this.allQuentity.push(parseInt(this.cartArray[i].currentQuantity));
        this.allQuentity_static.push(parseInt(this.cartArray[i].currentQuantity));
        this.allprices.push(parseInt(this.cartArray[i].price));

        this.allprices_static.push(parseInt(this.cartArray[i].price));
      }
        loading.dismiss();
       
        

    } else {
      this.cartArray = [];
      loading.dismiss();

    }
  }


  // remove wishes
  removeCart(cartID,index) {
    let confirmAlert = this.alertCtrl.create({
      title: 'Are you Sure you want to delete this Cart?',
      // message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log(index);
            
            this.cartArray.splice(index, 1);
            console.log("DDDD: ",this.cartArray)
            localStorage.removeItem('carts');
            localStorage.setItem('carts',  JSON.stringify(this.cartArray) + "");
                this.presentToast("Cart Detele Success");


            this.getAllCarts();
            // let loading = this.loading.create({
            //   content: this.pleaseWait
            // });
            // loading.present();
            // this.ProductsService.removeWish(cartID).subscribe(
            //   data => {
            //     this.presentToast(data.Message);

            //     this.getAllCarts();
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

  // add to cart
  addWihes(product) {
    let confirmAlert = this.alertCtrl.create({
      title: 'Are you Sure you want to Add this wish?',
      // message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
      buttons: [
        {
          text: 'OK',
          handler: () => {

            console.log(product);

            let loading = this.loading.create({
              content: this.pleaseWait
            });
            loading.present();
            this.ProductsService.addWish(product.id).subscribe(
              data => {
                this.presentToast(data.Message);

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

  // toast
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }



}
