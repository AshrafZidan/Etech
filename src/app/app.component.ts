import { ProfileuserServiceProvider } from './../providers/profileuser-service/profileuser-service';
import { AuthentcationServices } from './../providers/authentcation-services';
import { Component ,ViewChild, EventEmitter, Output, OnInit} from '@angular/core';
import { Platform, MenuController, App, ToastController, Nav, LoadingController, AlertController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Network } from '@ionic-native/network';
import { sessionData } from '../pages/shared/session-data';
import { GlobalState } from './global.state';
import { concatStatic } from 'rxjs/operator/concat';
import { ProductsServiceProvider } from './../providers/products-service/products-service';
import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp  {


  @ViewChild(Nav) nav: Nav;

  Search_key ;
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// public variables ///////////////////////////////////////////
  public rootPage: any ;
  public textDir: string = "rtl";
  public sideMenu: string;
  public languageInSildClass: string = "en";
  public isOnline: boolean = true;
  public toast: any;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// public static variables ////////////////////////////////////
  public static language = "en";
  public  language1:string ;
  public pleaseWait: string = null;

  public  currency:string = "GBP";
  public currencies;
  public UserName:string [];
  public name:string ;
  public Category : any = [];
  showSubmenu: boolean = false;



  menuItemHandler(): void {
    this.showSubmenu = !this.showSubmenu;
  }



  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// constructor ///////////////////////////////////////////////
  @ViewChild('nav') navs: NavController;

  constructor(
    public translate: TranslateService,
    public app: App, platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    public menu: MenuController,
    public authServices: AuthentcationServices,
    private loading: LoadingController,
    private alertCtrl: AlertController,
    public ProductsService:ProductsServiceProvider,
    private network: Network,
    private globalState: GlobalState,
    public toastCtrl: ToastController,
    public userServiceProvider: ProfileuserServiceProvider

  ) {
    /////////////////////////////////// set default language to app //////////////////////////////////////////////////
    translate.setDefaultLang('en');
  
    
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();



      ///////////////////////////////////////// on thread to watch change of language ////////////////////////////////
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.textDir = event.lang == 'ar' ? 'rtl' : 'ltr';
        this.sideMenu = event.lang == 'ar' ? 'right' : 'left';
        MyApp.language = event.lang;
        this.languageInSildClass = event.lang;
      });

      //////////////////////////////////////////// watch network for a disconnect////////////////////////////////////
      this.network.onDisconnect().subscribe(() => {

        var iDiv = document.createElement('div');
        var iPar = document.createElement('p');
        iDiv.id = 'netOffInfo';
        iDiv.className = 'netOffInfo';
        iPar.className = 'netparagrap';
        document.getElementsByTagName('body')[0].appendChild(iDiv);
        document.getElementsByClassName('netOffInfo')[0].appendChild(iPar);
        iPar.innerHTML = "يتعذر الإتصال بالإنترنت";

        console.log('network was disconnected :-(');
      });

      /////////////////////////////////////////// watch network for a connection /////////////////////////////////////
      this.network.onConnect().subscribe(() => {
        var element = document.getElementById("netOffInfo");
        if (element) {
          element.parentNode.removeChild(element);
        }
        console.log('network connected!');
      });



    });


    this.translate.get(['pleaseWait']).subscribe((res) => {
      this.pleaseWait = res.pleaseWait;
    });
    this.checkAccess();
  
  

  }



  checkAccess(){
    sessionData.getDataFromLocalstorage();
    this.currency=sessionData.currency;
    
    this.language1=sessionData.language;

  

   
    if(sessionData.is_log && sessionData.userToken != null){
      
            
    this.name = sessionData.userName.split(" ")[0];
    this.Category =  JSON.parse(localStorage.getItem('Category') ) ;
       
        
      this.rootPage= "HomePage";
    

      
      
   
    }else{
      console.log("ellllse");
      
      this.rootPage= "LoginPage";
    }


    if(sessionData.language =='ar'){
      this.translate.use(sessionData.language);

    }else{
      this.translate.use(sessionData.language);
    

    }

    
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// methods ///////////////////////////////////////////////////



  /////////////////////////////////////////// open any page in menu in app ////////////////////////////////////////////
  openPage(page) {

    this.app.getRootNav().setRoot(page);
    this.menu.close();
  }

  logout() {

    let confirmAlert = this.alertCtrl.create({
      title: 'Are you Sure To Logout?',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            let loading = this.loading.create({
              content: this.pleaseWait
            });
            loading.present();
            this.authServices.logOut().subscribe(
              data => {
                this.app.getRootNav().setRoot("LoginPage");
                sessionData.clearDateFromLocalStorage();
                sessionData.clearDataInsession();
                this.menu.close();
                loading.dismiss();
              }, error => {
                this.presentToast('error log out');
                loading.dismiss();
              }
            );
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
    this.toast = this.toastCtrl.create({
      message: text,
      // duration: 3000,
      position: 'top'
    });
    this.toast.present();
  }




searchProduct2(key){
  this.app.getRootNav().setRoot('HomePage', {myData:key});
  this.menu.close();

  // this.navs.push('HomePage' , {
  //   search_product: key
//   // }
// )
 
}
 




 

  
}

