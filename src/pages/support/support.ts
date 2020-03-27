import { MyApp } from './../../app/app.component';
import { Component } from '@angular/core';
import { IonicPage, NavController,Platform, NavParams } from 'ionic-angular';

/**
 * Generated class for the SupportPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-support',
  templateUrl: 'support.html',
})
export class SupportPage {

  constructor(platform: Platform,public navCtrl: NavController, public navParams: NavParams , public app:MyApp) {
    platform.registerBackButtonAction(() => {
      this.app.openPage('HomePage');
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupportPage');
  }




  back() {

    this.app.openPage('HomePage');
  }


}
