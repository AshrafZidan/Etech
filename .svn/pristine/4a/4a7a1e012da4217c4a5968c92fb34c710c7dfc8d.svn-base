import { sessionData } from './../shared/session-data';
import { TranslateService } from '@ngx-translate/core';
import { ProfileuserServiceProvider } from './../../providers/profileuser-service/profileuser-service';
import { MyApp } from './../../app/app.component';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the AddressPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {
  public pleaseWait: string = null;
  public addressArray: any = [];
  dest = false ; 
  constructor(public navCtrl: NavController, platform: Platform, public navParams: NavParams,
    public app: MyApp,
    private loading: LoadingController,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,

    public translate: TranslateService,



    public userServiceProvider: ProfileuserServiceProvider) {

    platform.registerBackButtonAction(() => {


      if (this.navParams.get('fromShipAddress')) {
        
        this.app.openPage('ShipAddressPage');
      
    } 
    else{
      this.app.openPage('HomePage');

    }
    });

    this.translate.get(['pleaseWait']).subscribe((res) => {
      this.pleaseWait = res.pleaseWait;
    });


    this.getAddress();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressPage');
  }
  openPage(namePage) {
    this.app.openPage(namePage);
  }

  editAddress(namePage,item) {
    console.log(this.dest , " ssss");
    
    this.navCtrl.push(namePage,{addressItem:item , dest:this.dest});
  }

  back() {

    if (this.navParams.get('fromShipAddress')) {
        
      this.app.openPage('ShipAddressPage');
    
  } 
  else{
    this.app.openPage('HomePage');

  }
  }


  // get Address
  getAddress() {
    let loading = this.loading.create({
      content: this.pleaseWait
    });
    loading.present();
    this.userServiceProvider.getuseraddress().subscribe(
      data => {
        if (JSON.stringify(data.InnerData) != '{}') {
          this.addressArray = data.InnerData;
        } else {
          this.addressArray = []
        }
        // console.log("sss: ",data)
        loading.dismiss();
      }
      , error => {
        // console.log("sss: ",error)
        sessionData.clearDateFromLocalStorage();
        this.app.openPage('LoginPage')
        loading.dismiss();

      });
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
                  this.getAddress();
                  
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

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
