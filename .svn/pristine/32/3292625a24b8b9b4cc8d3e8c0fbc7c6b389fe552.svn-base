import { ProfileuserServiceProvider } from './../../providers/profileuser-service/profileuser-service';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyApp } from './../../app/app.component';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the AddAddressPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-address',
  templateUrl: 'add-address.html',
})
export class AddAddressPage {



  public myForm: FormGroup;
  public street: string = null;
  public city: string = null;
  public zipCode: number = null;
  public country: string = null;
  public phoneNumber: number = null;
  public work: string = null;

  public pleaseWait: string = null;


  public getAddressItem: any;

  constructor(public navCtrl: NavController, platform: Platform,
    private builder: FormBuilder,
    public translate: TranslateService,
    private loading: LoadingController,

    public ProfileuserService: ProfileuserServiceProvider,
    public toastCtrl: ToastController,

    public navParams: NavParams, public app: MyApp) {
      console.log(this.navParams.get('fromShipAddressUpdate') , "sssasdadadadsada") ;
    platform.registerBackButtonAction(() => {

        
      if (this.navParams.get('fromShipAddressUpdate')) {
        
        this.app.openPage('ShipAddressPage');
        
      } else {
        
        this.app.openPage('AddressPage');
      }
    });

    this.translate.get(['pleaseWait']).subscribe((res) => {
      this.pleaseWait = res.pleaseWait;
    });




    this.myForm = this.builder.group({
      "addressStreet": ['', Validators.compose([Validators.required])],
      'adressCity': ['', Validators.compose([Validators.required])],
      'adressZip': ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]+$"), ])],
      'adressCountry': ['', Validators.compose([Validators.required, ])],
      'adressPhoneNumber': ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]+$"), Validators.maxLength(20)])],
      'addressWork': ['', Validators.compose([Validators.required, ])],
    });


    if (this.navParams.get('addressItem') != undefined) {
      this.getAddressItem = this.navParams.get('addressItem');
      this.street = this.getAddressItem.street_address;
      this.city = this.getAddressItem.city;
      this.zipCode = parseInt(this.getAddressItem.zip_code);
      this.phoneNumber = parseInt(this.getAddressItem.phone_number);
      this.work = this.getAddressItem.address_label;
      this.country = this.getAddressItem.country;

    }

      console.log(this.navParams.get('dest') );
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAddressPage');
  }

  back() {
    
    
    if (this.navParams.get('fromShipAddressUpdate')) {
      this.app.openPage('ShipAddressPage');
         
       } else {
         
         this.app.openPage('AddressPage');
       }
       
  }

  openPage(namePage) {
    this.app.openPage(namePage);
  }



  // validation methods
  hasError(field: string, error: string) {
    const ctrl = this.myForm.get(field);
    return ctrl.dirty && ctrl.hasError(error);
  }

  // add address
  addAddress() {

    if (this.getAddressItem == undefined) {
  // add address

      let loading = this.loading.create({
        content: this.pleaseWait
      });
      loading.present();

      this.ProfileuserService.addUserAddress(this.street, this.city, this.zipCode, this.country, this.phoneNumber, this.work).subscribe(
        data => {

          this.presentToast(data.Message);
          this.myForm.reset();
          loading.dismiss();
          // this.app.openPage('AddressPage');

        }
        , error => {

          loading.dismiss();
          // this.isCorrect = true;
        });

    } else {
  // edit address

      let loading = this.loading.create({
        content: this.pleaseWait
      });
      loading.present();

      this.ProfileuserService.updateaddressbyid(this.getAddressItem.id, this.street, this.city, this.zipCode, this.country, this.phoneNumber, this.work).subscribe(
        data => {

          this.presentToast(data.Message);
          loading.dismiss();
          
          if (this.navParams.get('fromShipAddressUpdate')) {
         this.app.openPage('ShipAddressPage');
            
          } else {
            
            this.app.openPage('AddressPage');
          }

        }
        , error => {

          loading.dismiss();
          // this.isCorrect = true;
        });


    }


  }

  // // edit address
  // updateAddress() {

  //   let loading = this.loading.create({
  //     content: this.pleaseWait
  //   });
  //   loading.present();

  //   this.ProfileuserService.updateaddressbyid(this.getAddressItem.id, this.street, this.city, this.zipCode, this.country, this.phoneNumber, this.work).subscribe(
  //     data => {

  //       this.presentToast(data.Message);
  //       loading.dismiss();
  //       this.app.openPage('AddressPage');

  //     }
  //     , error => {

  //       loading.dismiss();
  //       // this.isCorrect = true;
  //     });


  // }
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }


}
