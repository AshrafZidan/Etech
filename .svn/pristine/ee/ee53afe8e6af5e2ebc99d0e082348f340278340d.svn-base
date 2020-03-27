import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController, ToastController, MenuController } from 'ionic-angular';
import 'rxjs/add/operator/catch';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { ProductsServiceProvider } from './../../providers/products-service/products-service';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// General Classes /////////////////////////////////////////////
import { sessionData } from '../shared/session-data'
import { MyApp } from '../../app/app.component';



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// Providers /////////////////////////////////////////////
import { AuthentcationServices } from './../../providers/authentcation-services';



/**
 * Generated class for the Signup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'signup-page',
  templateUrl: 'signup.html',
})
export class Signup {
  // public ProductsService: ProductsServiceProvider;
  Category :any ;
  //password-input
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  
  confirmpasswordType: string = 'password';
  confirmpasswordIcon: string = 'eye-off';
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// Form Validation ///////////////////////////////////////////
  signUpForm: FormGroup;



  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// public variables //////////////////////////////////////////

  public firstName: string = null;
  public lastName: string = null;
  public userEmail: string = null;
  public userPassword: string = null;
  public userConfirmPassword: string = null;
  public disableded ;
  // public userconPassword: string = null;
  public accountType = [];
  public language: string;

  ///////////////////////////////////////////////////////////// translate key //////////////////////////////////
  public pleaseWait: string = null;


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// constructor ///////////////////////////////////////////////

  constructor(
    public myapp: MyApp,
    private loading: LoadingController,
    private builder: FormBuilder,
    public authServices: AuthentcationServices,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public translate: TranslateService,
    private viewCtrl: ViewController, public ProductsService: ProductsServiceProvider,
    public menuCtrl: MenuController,


  ) {

    ////////////////////////////////////////////////// form validation ////////////////////////////////////////////////
    this.signUpForm = builder.group({
      'firstname': ['', [Validators.required,  Validators.maxLength(20)]],
      'lastname': ['', [Validators.required, Validators.maxLength(20)]],
      // 'userEmail':['',[Validators.required, Validators.minLength(8),Validators.pattern("")]],
      "useremail": ['', Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])],
   "accountType":['',[Validators.required]],
     
      'password': ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(20)])],
      'confirmpassword': ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(20)])],
    });


    //////////////////////////////////////////////////////// get tarnslation Key ////////////////////////////////
    this.translate.get(['pleaseWait']).subscribe((res) => {
      this.pleaseWait = res.pleaseWait;
    });
    this.language = myapp.translate.store.currentLang;
    this.translate.use(sessionData.language);



    // this.disableded menu 
    this.menuCtrl.enable(false)

    this.getCategorayWithouttkn();

  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// methods ///////////////////////////////////////////////////

  togglePassword  (id){
  
    var inputValue = (<HTMLInputElement>document.getElementById(id)).value;
    //  var inputValue = document.getElementById(id)["value"];
    console.log(inputValue , "SS");
    
      if (inputValue === "password") {
        inputValue= "text";
    
      } else {
        inputValue = "password";
          
  
      }   
}


  signUp() {

 
    console.log(this.firstName, this.lastName, this.userEmail, this.userPassword, this.accountType);

    // const formValue = this.signUpForm.value;

    let loading = this.loading.create({
      content: this.pleaseWait
    });
    loading.present();

   
    let categories = this.accountType ; 

    this.authServices.userSignUp(this.firstName, this.lastName, this.userEmail, this.userPassword, categories ).subscribe(
      data => {
        loading.dismiss();
        // sessionData.userId = data;
        // sessionData.saveDataInSingUpToVerifyCode(data, this.userPhone, this.userPassword, this.userName);
        // this.isCorrect = false;
        if (data.Message == 'Registered successfully.' || data.InnerData=={})  {
          this.navCtrl.setRoot("Verifypage")
          // .then(() => {
          this.presentToast(data.Message)
        } else {
          this.presentToast(data.Message)

        }
        // const index = this.viewCtrl.index;
        // this.navCtrl.remove(index);
        // });
      }
      , error => {

        loading.dismiss();
        // this.isCorrect = true;
      });


  }

  goTo() {
    this.navCtrl.push("Verifypage");

  }



  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// General methods ///////////////////////////////////////////

  hasError(field: string, error: string) {
    const ctrl = this.signUpForm.get(field);
    return ctrl.dirty && ctrl.hasError(error);
  }


  // matchingPasswords(passwordKey: string, confirmPasswordKey: string): boolean {
  //   let flag = false;
  //   if (passwordKey == confirmPasswordKey) {
  //     flag = true;
  //   } else {
  //     flag = false;
  //   }
  //   return flag;
  // }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  openPage(namePage) {
    this.navCtrl.push(namePage);
  }

  // hideShowPasswordFun
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  hideShowConfirmPassword() {
    this.confirmpasswordType = this.confirmpasswordType === 'text' ? 'password' : 'text';
    this.confirmpasswordIcon = this.confirmpasswordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }


  
  getCategorayWithouttkn() {

    let loading = this.loading.create({
      content: this.pleaseWait
    });
    loading.present();

    this.ProductsService.getCategorayWithouttkn(sessionData.language).subscribe(
      data => {
        
        loading.dismiss();

        this.Category = [];
        if (JSON.stringify(data.InnerData) != '{}') {
          this.Category = data.InnerData;
          
        } else {
          this.Category = [];

        }


      }
      , error => {
        console.log("sss: ",error)
        // sessionData.clearDateFromLocalStorage();
        // this.openPage('LoginPage')
        loading.dismiss();
        
      });

}

check(e){
  console.log(e)
  console.log(e.target.checked)
  console.log(e.target.value)
  if (e.target.checked == true) {
    
    this.accountType.push(parseInt(e.target.value))
  }
  else{
    this.accountType.pop()

  }

  return this.accountType;
}

}

