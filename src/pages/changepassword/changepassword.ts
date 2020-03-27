import { sessionData } from './../shared/session-data';
import { AuthentcationServices } from './../../providers/authentcation-services';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyApp } from './../../app/app.component';
import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams, LoadingController, ToastController } from 'ionic-angular';

/**
 * Generated class for the ChangepasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {

  //password-input
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';


  public myForm: FormGroup;

  public currentPass: string = null;
  public newPass: string = null;
  public pleaseWait: string = null;

  constructor(platform: Platform, public navCtrl: NavController,
    private loading: LoadingController,
    private builder: FormBuilder,
    public toastCtrl: ToastController,

    public translate: TranslateService,
    public authServices: AuthentcationServices,

    public navParams: NavParams, private app: MyApp) {
    platform.registerBackButtonAction(() => {
      this.app.openPage('UserprofilePage');
    });
    this.translate.use(sessionData.language);

    this.myForm = this.builder.group({
      "currentpass": ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])],
      'newpass': ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])],

    });

    this.translate.get(['pleaseWait']).subscribe((res) => {
      this.pleaseWait = res.pleaseWait;
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }

  // hideShowPasswordFun
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  back() {

    this.app.openPage('UserprofilePage');
  }



  // change user password
  changeUserPassword() {
    
    
    let loading = this.loading.create({
      content: this.pleaseWait
    });
    loading.present();

    this.authServices.changePassword(this.currentPass,this.newPass).subscribe(
      data => {

       

        if(data.Status){
          this.presentToast(data.Message);
          this.app.openPage('HomePage');
        }
        this.presentToast(data.Message);
        loading.dismiss();

      }
      , error => {
        this.presentToast(error.Message);

        loading.dismiss();
        // this.isCorrect = true;
      });


  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  // validation methods
  hasError(field: string, error: string) {
    const ctrl = this.myForm.get(field);
    return ctrl.dirty && ctrl.hasError(error);
  }


}
