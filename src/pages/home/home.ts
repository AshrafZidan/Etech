import { ProfileuserServiceProvider } from './../../providers/profileuser-service/profileuser-service';
import { ProductsServiceProvider } from './../../providers/products-service/products-service';
import { TranslateService } from '@ngx-translate/core';
import { sessionData } from './../shared/session-data';
import { Component, Injectable , ViewChild  , AfterViewInit} from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Toast, ToastController, MenuController } from 'ionic-angular';

import { MyApp } from '../../app/app.component';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// Providers /////////////////////////////////////////////
// import { AuthentcationServices } from './../../providers/authentcation-services';

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

@Injectable()

export class HomePage {

// @ViewChild(MyApp) child;

  items = [];
  public pleaseWait: string = null;

  public products = [];
  products_filtered  = [];
  filtered_flag;
  public search: string = '';

  public flagSearch: boolean = false;

  public Category ;
  Categoray_filter = false;
  fromfilterFlag = false;
  public shipNumber: number = 0;
  public curr ; 
public dataCounter = 1;
  filterFlag = false;
  currentSymbol = '€' ;
 scrollBolean = true; 
  public sameCategoray;
   
  constructor(
    private translate: TranslateService  , 
    private navParams: NavParams,
    private ProductsService: ProductsServiceProvider,
    private myapp: MyApp,
    private navCtrl: NavController,
    private loading: LoadingController ,
    public toastCtrl: ToastController,
    private menuCtrl: MenuController,
    public userServiceProvider: ProfileuserServiceProvider





  ) {
    this.translate.use(sessionData.language);

    this.myapp.checkAccess()

    

    this.menuCtrl.enable(true)

    this.currentSymbol = localStorage.getItem('currencySymbol');
    

      ///SEARCH FROM CATEGORY LIST
  if (this.navParams.get('myData') != null) {

      this.searchCategoray(this.navParams.get('myData').category_id);
    
    } 
  
    if (this.navParams.get('backfromFilter') == true) {
      this.filterFlag = true;
      this.filtered_flag = this.navParams.get('backfromFilter');
      this.products_filtered = this.navParams.get('result'); 
      this.products = this.products_filtered;
      this.fromfilterFlag = true;
      this.scrollBolean =false;  
      this.sameCategoray = this.navParams.get('sameCategoray');
      
    }
    else{

      if (this.flagSearch || this.navParams.get('myData') == null) {
        console.log("Default get product" ,  this.navParams.get('myData') == null ,  this.flagSearch );
        
        this.getAllProduct();
      }
    }
    

    if (JSON.parse(localStorage.getItem('carts')) != null) {
      this.shipNumber = JSON.parse(localStorage.getItem('carts')).length;
    } else {
      this.shipNumber = 0;
    }


    this.translate.get(['pleaseWait']).subscribe((res) => {
      this.pleaseWait = res.pleaseWait;
    });

    if (this.navParams.get('flag') != undefined) {
      
      this.flagSearch = this.navParams.get('flag');
      this.search = this.navParams.get('search');
  
    }


  
  }



  filterItems(e) {
    var list = document.getElementById('res-list');
    list.style.display = 'block';
  }



  home() {
    this.navCtrl.push("HomePage")
  
  }


  /////////////////////////////////////////////////////////// open any page you want /////////////////////////////////
  goToSinglePage(namePage, item) {

    this.navCtrl.push(namePage, {
      product: item
    });
  }


  openpage(namePage) {
    if (namePage == 'FilterPage') {
        if (this.navParams.get('backfromFilter') ) {
         
          
          this.navCtrl.push('FilterPage', {
            item:this.sameCategoray
          });
          
        } 
        else {
          this.navCtrl.push('FilterPage', {
            item:this.navParams.get('myData')
          });
          
        }
    
      
      
    }
    else{

      this.myapp.openPage(namePage);
    }
   
  }



  // get all product
  getAllProduct() {
    let loading = this.loading.create({
      content: this.pleaseWait
    });
    loading.present();
    this.curr = sessionData.currency;
    this.ProductsService.getAllProduct(sessionData.language, sessionData.currency , this.dataCounter).subscribe(
      data => {
        if (JSON.stringify(data.InnerData) != '{}') {
          this.scrollBolean = true
          this.products = data.InnerData;

        } else {
          this.products = [];
        }
        loading.dismiss();
      }
      , error => {
        // console.log("sss: ",error)
        sessionData.clearDateFromLocalStorage();
        this.myapp.openPage('LoginPage')
        loading.dismiss();

      });
  }


  // search Product
  searchProduct() {
    let loading = this.loading.create({
      content: this.pleaseWait
    });
    loading.present();
    this.ProductsService.searchProduct(this.search, sessionData.language,sessionData.currency).subscribe(
      data => {

        
        this.products = [];
        if (JSON.stringify(data.InnerData) != '{}') {
          this.scrollBolean = false
          this.products = data.InnerData;
        } else {
          this.products = [];

        }
        loading.dismiss();
        console.log(  this.products , ' key');
      }
      , error => {
        // console.log("sss: ",error)
        sessionData.clearDateFromLocalStorage();
        this.myapp.openPage('LoginPage')
        loading.dismiss();

      });



  

    }

  


  


        
  // search Product with categoray
  searchCategoray(categoray_id) {
    let loading = this.loading.create({
      content: this.pleaseWait
    });
    loading.present();
    this.ProductsService.getProductWithcategory(categoray_id , sessionData.currency).subscribe(
      data => {

        this.products = [];
        if (JSON.stringify(data.InnerData) != '{}') {
          
          this.Categoray_filter = true;
          this.scrollBolean = false
          this.products = data.InnerData;
          this.filterFlag = true;
          loading.dismiss();
        }

         else{
           this.products = [];

        if (this.products.length == 0) {
          // to show filter icon in homePage
          
          loading.dismiss();
          // this.getAllProduct();
            this.filterFlag = false;
            }

          else{
          
            loading.dismiss();
          }
        }

          
        
         
      }
      , error => {
        // console.log("sss: ",error)
        sessionData.clearDateFromLocalStorage();
        this.myapp.openPage('LoginPage')
        loading.dismiss();

      });


      
  }



  // to load data Async
  doInfinite(infiniteScroll) {

    this.dataCounter++;
    
    this.ProductsService.getAllProduct(sessionData.language, sessionData.currency , this.dataCounter).subscribe(
      data => {
        if (JSON.stringify(data.InnerData) != '{}') {
          this.products = this.products.concat(data.InnerData);
          
          infiniteScroll.complete();

        } else {
          infiniteScroll.complete();
        }
      }
      , error => {
        // console.log("sss: ",error)
        sessionData.clearDateFromLocalStorage();
        this.myapp.openPage('LoginPage')
        

      });
  }


    



   

  





  // toast
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 1900,
      position: 'top'
    });
    toast.present();
  }


  }


