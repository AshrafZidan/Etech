import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { sessionData } from './../shared/session-data';
import { ProfileuserServiceProvider } from './../../providers/profileuser-service/profileuser-service';
import { TranslateService } from '@ngx-translate/core';
import { MyApp } from './../../app/app.component';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, ToastController } from 'ionic-angular';

/**
 * Generated class for the UserprofilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userprofile',
  templateUrl: 'userprofile.html',
})
export class UserprofilePage {

  public pleaseWait: string = null;
  public userProfile: any = [];

  public myForm: FormGroup;

  public FirstName: string = null;
  public LastName: string = null;
  public Password: string = null;

  public placeholder = '';
  constructor(platform: Platform, public navCtrl: NavController,
    public navParams: NavParams,
    private loading: LoadingController,
    private builder: FormBuilder,
    public toastCtrl: ToastController,

    public translate: TranslateService,

    public userServiceProvider: ProfileuserServiceProvider,
    public app: MyApp) {
    platform.registerBackButtonAction(() => {
      this.app.openPage('HomePage');
    });

    this.translate.use(sessionData.language);


// Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')
    this.myForm = this.builder.group({
      "firstname": ['', Validators.compose([Validators.required, Validators.maxLength(25)])],
      'lastname': ['', Validators.compose([Validators.required, Validators.maxLength(25)])],
      'password': ['', Validators.compose([Validators.required])],

    });



    this.translate.get(['pleaseWait']).subscribe((res) => {
      this.pleaseWait = res.pleaseWait;
    });
    this.getUserProfileData();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserprofilePage');
  }

  back() {

    this.app.openPage('HomePage');
  }

  openPage(namePage) {
    this.app.openPage(namePage);
  }

  // get user profile
  getUserProfileData() {
    let loading = this.loading.create({
      content: this.pleaseWait
    });
    loading.present();
    this.userServiceProvider.getUserById().subscribe(
      data => {
        console.log("sss: ", data)
        if (JSON.stringify(data.InnerData) != '{}') {
          this.userProfile = data.InnerData;
          if(this.userProfile.name != null){
            this.FirstName=this.userProfile.name.substr(0,this.userProfile.name.indexOf(' '));
            this.LastName=this.userProfile.name.substr(this.userProfile.name.indexOf(' ')+1); 
          }
                  

        } else {
          this.userProfile = [];
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

  // update user profile
  updateUserProfileData() {
    
    let fullName:any=this.FirstName.concat(' '+this.LastName);
    
    let loading = this.loading.create({
      content: this.pleaseWait
    });
    loading.present();

    this.userServiceProvider.updateProfile(fullName,this.Password).subscribe(
      data => {

        this.presentToast(data.Message);
        loading.dismiss();
        this.app.openPage('HomePage');

      }
      , error => {

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


