import { ProfileuserServiceProvider } from './../../providers/profileuser-service/profileuser-service';
import { ProductsServiceProvider } from './../../providers/products-service/products-service';
import { TranslateService } from '@ngx-translate/core';
import { sessionData } from './../shared/session-data';
import { MyApp } from './../../app/app.component';
import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';

/**
 * Generated class for the ShipAddressPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ship-address',
  templateUrl: 'ship-address.html',
})
export class ShipAddressPage {

  public shippmentArray: any = [];
  public pleaseWait: string = null;

  public getCartsItem: any = [];
  public quintityValu:any=[];
  public price: any = 0;
  public radioCheck: any;
  currentSymbol;
  
  constructor(platform: Platform, public navCtrl: NavController, public navParams: NavParams,
    private loading: LoadingController,
    private alertCtrl: AlertController,
    public userServiceProvider: ProfileuserServiceProvider,
        public translate: TranslateService,
    public ProductsService: ProductsServiceProvider,
    public toastCtrl: ToastController,
    public app: MyApp) 
    
    {
    platform.registerBackButtonAction(() => {
      this.app.openPage('CartPage');
    });

    this.translate.get(['pleaseWait']).subscribe((res) => {
      this.pleaseWait = res.pleaseWait;
    });


    this.currentSymbol = localStorage.getItem('currencySymbol');

    // this.getCartsItem = this.navParams.get('carts');
    // this.quintityValu = this.navParams.get('quentity');
    // this.price = this.navParams.get('price');

    // this.cartArray = JSON.parse(localStorage.getItem('carts'));

    this.getCartsItem =  JSON.parse(localStorage.getItem('cartArrayFromCartPage'));

    
    this.quintityValu =  JSON.parse(localStorage.getItem('quentityFromCartPage'));
    
    this.price = parseFloat(localStorage.getItem('priceFromCartPage'));


      
    // if (this.navParams.get('carts') == undefined || this.navParams.get('price') == undefined || this.navParams.get('quentity')==undefined) {
    //   this.getCartsItem = [];
    //   this.price = 0;
    // } else {
    //   this.getCartsItem = this.navParams.get('carts');
    //   this.quintityValu = this.navParams.get('quentity');
    //   this.price = this.navParams.get('price');
    // }

    this.getaddressshippment();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShipAddressPage');
  }


  openPage(namePage) {
    this.navCtrl.push(namePage , {
      fromShipAddress : true
    })
  }
  
  // go to place order 
  goPlaceOrderPage(namePage) {
    console.log(this.quintityValu);
    
    this.navCtrl.push(namePage, { carts: this.getCartsItem, price: this.price ,quentity:this.quintityValu , address_id: this.radioCheck });
  }

  back() {
    this.app.openPage('CartPage');
  }

  // get all carts
  getaddressshippment() {
    let loading = this.loading.create({
      content: this.pleaseWait
    });
    loading.present();
    this.ProductsService.getAddressShippment().subscribe(
      data => {
        
        // let x=JSON.stringify(data.InnerData) 
      
        if (JSON.stringify(data.InnerData) !='{}') {
          this.shippmentArray = data.InnerData;
          if (this.shippmentArray.length > 0) {
            this.radioCheck = this.shippmentArray[0].id;

          }
        } else {
          this.shippmentArray = []
          
        }


        loading.dismiss();
      }
      , error => {
        // console.log("sss: ",error)
        sessionData.clearDateFromLocalStorage();
        this.app.openPage('LoginPage')
        loading.dismiss();

      });
  }


  
  editAddress(namePage,item) {
    this.navCtrl.push(namePage,{addressItem:item , fromShipAddressUpdate : true} );
  }



  
  // delete address deleteAddressById
  deleteAddress(addressID){
    

    let confirmAlert = this.alertCtrl.create({
      title: 'Are you Sure you want to delete this Address?',
      // message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            let loading = this.loading.create({
              content: this.pleaseWait
            });
            loading.present();
            this.userServiceProvider.deleteAddressById(addressID).subscribe(
              data => {
                // this.presentToast(data.Message)
                this.getaddressshippment();
                
                loading.dismiss();

                let confirmAlert = this.alertCtrl.create({
                  title: data.Message ,
                  buttons: [
                    {
                      text: 'OK',
                      handler: () => {
                      }
                    }
                ,
                  ] } ) ;
                
                  confirmAlert.present();
              },

              error => {
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

}
