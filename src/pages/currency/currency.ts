import { sessionData } from './../shared/session-data';
import { ProfileuserServiceProvider } from './../../providers/profileuser-service/profileuser-service';
import { TranslateService } from '@ngx-translate/core';
import { MyApp } from './../../app/app.component';
import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the CurrencyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-currency',
  templateUrl: 'currency.html',
})
export class CurrencyPage {
  public pleaseWait: string = null;


  public currencies: any;
  public currency: string = '';

  constructor(platform: Platform, public navCtrl: NavController, public navParams: NavParams,
    public app: MyApp,
    private loading: LoadingController,

    public translate: TranslateService,

    public userServiceProvider: ProfileuserServiceProvider) {
    platform.registerBackButtonAction(() => {
      this.app.openPage('HomePage');
    });

    this.translate.get(['pleaseWait']).subscribe((res) => {
      this.pleaseWait = res.pleaseWait;

    });
    this.currency = sessionData.currency;
    console.log(this.currency , "Cuurrence" , this.getCurrencies)
    this.getCurrencies();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrencyPage');
  }

  back() {

    this.app.openPage('HomePage');
  }

  //  get Currencies
  getCurrencies() {
    let loading = this.loading.create({
      content: this.pleaseWait
    });
    loading.present();
    this.userServiceProvider.getCurrencies().subscribe(
      data => {
        console.log("sss: ", data)
        this.currencies = data.InnerData;
        loading.dismiss();
      }
      , error => {
        // console.log("sss: ",error)
        sessionData.clearDateFromLocalStorage();
        this.app.openPage('LoginPage')
        loading.dismiss();

      });
  }


  // svae language
  saveCurrency() {
    localStorage.setItem('currency', this.currency + "");
    sessionData.getDataFromLocalstorage();
    this.app.currency = sessionData.currency
    console.log(   this.app.currency );
    
    this.app.openPage('HomePage');

  }

}
