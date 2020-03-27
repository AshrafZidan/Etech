import { TranslateService } from '@ngx-translate/core';
import { sessionData } from './../shared/session-data';
import { ProfileuserServiceProvider } from './../../providers/profileuser-service/profileuser-service';
// import { HomePage } from './../home/home';

import { MyApp } from './../../app/app.component';
import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams, App, LoadingController } from 'ionic-angular';

/**
 * Generated class for the LanguagesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-languages',
  templateUrl: 'languages.html',
})
export class LanguagesPage {
  public pleaseWait: string = null;

  public Languages: any;
  public language: string = '';
  constructor(platform: Platform, public navCtrl: NavController,
    public navParams: NavParams, public app: MyApp,
    private loading: LoadingController,

    public translate: TranslateService,

    public userServiceProvider: ProfileuserServiceProvider) {
    this.translate.get(['pleaseWait']).subscribe((res) => {
      this.pleaseWait = res.pleaseWait;
    });
    platform.registerBackButtonAction(() => {
      this.app.openPage('HomePage');
    });

    this.getAllLang();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LanguagesPage');
  }

  back() {
    this.app.openPage('HomePage');
  }
  // get all language
  getAllLang() {
    let loading = this.loading.create({
      content: this.pleaseWait
    });
    loading.present();
    this.language = sessionData.language;
    this.userServiceProvider.getLanguages().subscribe(
      data => {
        if (JSON.stringify(data.InnerData) != '{}'){ 
        this.Languages = data.InnerData;
        }else{
          this.Languages=[];
        }
        loading.dismiss();


      }
      , error => {
        sessionData.clearDateFromLocalStorage();
        this.app.openPage('LoginPage')
        loading.dismiss();

      });
  }

  // update  language

  updateLanguage() {
    localStorage.setItem('Language', this.language + "");
    sessionData.getDataFromLocalstorage();
    this.app.language1=sessionData.language;
    this.translate.use(sessionData.language);

    this.app.openPage('HomePage');
  }


}
