import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsServiceProvider } from './../../providers/products-service/products-service';
import { TranslateService } from '@ngx-translate/core';
import { sessionData } from './../shared/session-data';
import { MyApp } from './../../app/app.component';
import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams, LoadingController, ToastController } from 'ionic-angular';

/**
 * Generated class for the SingleProductPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-single-product',
  templateUrl: 'single-product.html',
})
export class SingleProductPage {
  public currentNumber:number = 0 ;
  public main_price ;
  public pleaseWait: string = null;
 public Last_Vartion_Id ;

  public singleProLocal:any=[];
  public productValue: any;
  public singleProduct:any=[];
  public ProductVarition:any=[];
  public default_Color = [];
  public default_Memory ;
  public curr ;
 public productImages = [];
 final_vartions = [];
  public shipNumber:number=0;
  Vartions ;
  vartion_map = new Map();
   final_res = 0;
   testVale ;

   newResult = 0 ;
   selected ; 
   sending_Options;
   default_vartions = [];

  singleProduct_Dir ;
productID_FromWish;

   optionsForm:FormGroup;
   currentSymbol;
  public search:string='';
  public render;
  constructor(platform: Platform, public navCtrl: NavController,
    public navParams: NavParams, public app: MyApp,
    private loading: LoadingController,

    public translate: TranslateService,

    public ProductsService: ProductsServiceProvider,
    public toastCtrl: ToastController,
    fb:FormBuilder
  
  ) {

    this.optionsForm =fb.group({
      "sending_Options":[  , Validators.required]
    })

    this.currentSymbol = sessionData.currencySymbol;

  

    platform.registerBackButtonAction(() => {
      this.app.openPage('HomePage');
    });
    this.translate.get(['pleaseWait']).subscribe((res) => {
      this.pleaseWait = res.pleaseWait;
    });


    if (JSON.parse(localStorage.getItem('carts')) != null) {
      this.shipNumber = JSON.parse(localStorage.getItem('carts')).length;
    } else {
      this.shipNumber = 0;
    }

    this.singleProduct_Dir = navParams.get('FromWish');
    this.productID_FromWish = navParams.get('product').product_id;

      
    this.productValue = navParams.get('product');
    if (this.singleProduct_Dir) {
      this.productValue.id = this.productID_FromWish;
    }
    
    
    if(JSON.parse(localStorage.getItem('carts'))!=null){
      this.singleProLocal=JSON.parse(localStorage.getItem('carts'));

    }
    

    this.getsingleProduct();
    // this.getProductVariations();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SingleProductPage');
  }
  back() {
    this.app.openPage('HomePage');
  }


  goToCartPage(page){
    this.navCtrl.push(page)
  }

  increment() {

      if (this.currentNumber == 0) {
          this.singleProduct.price =  this.singleProduct.price;
          this.currentNumber = 1 ;
      }


      else{

   
 
    if ( this.singleProduct.quantity >   this.currentNumber || this.singleProduct.quantity != 0 ) {
        this.currentNumber++;
 
 
      this.singleProduct.price = parseFloat(this.singleProduct.price) + parseFloat(this.main_price) + this.newResult ;
      
    } else {
      
      this.currentNumber = this.currentNumber;
      this.presentToast('Not Avilable in Stock');

    }
  }
    
    
  }

  decrement() {
    if (this.currentNumber <=1) {
      this.currentNumber = 1;

    }
    else {
this.currentNumber--;
    console.log(this.main_price  , "     minus before");

      this.singleProduct.price = parseFloat(this.singleProduct.price) - parseFloat(this.main_price )  - this.newResult;
    }
  }


  heartAction() {
    var heart = document.getElementById('heart');
    heart.classList.toggle('red-heart');
  }

  // get snigle product

  getsingleProduct() {
    let loading = this.loading.create({
      content: this.pleaseWait
    });
    loading.present();
    this.curr = sessionData.currency ;
    this.ProductsService.getSingleProduct(sessionData.language, sessionData.currency ,this.productValue.id).subscribe(
      data => {
        if (JSON.stringify(data.InnerData) != '{}') {
          this.singleProduct=data.InnerData;
          this.main_price = data.InnerData.price;
          if (data.InnerData.images.image) {
            var dataimage = {
              image : data.InnerData.images.image
            }
            this.productImages.push(dataimage);  

          }else{
            this.productImages =  data.InnerData.images;  

          }
            
            console.log(this.productImages);
            
          this.render = {};

          data.InnerData.variations.forEach(item => {
            
  
          let arr = [];
          if (item.hasOwnProperty("extra_fields")) {
            
              
            // console.log( item.extra_fields.title  , "  ",item);
            // if (item.extra_fields.id == item.field_id) {
              
            // }
            
          // console.log(this.vartion_map);
          
  
            if (item["extra_fields"].hasOwnProperty("title")) {
             
                
              // if (item["extra_fields"].title =='Color' && item.price ==0) {
              //     console.log(this.default_Color , " Color");
                  
              // } 
  
  
              // if (item["extra_fields"].title =='Memory' && item.price ==0) {
              //   this.default_Memory = item.value;
                  
              // } 
  
              let min_price = 0;
              
              this.render[item["extra_fields"].title] = {price: 0, id:0 , data: arr};
  
              data.InnerData.variations.forEach(itemInner => {
                if (itemInner["extra_fields"].title === item["extra_fields"].title) {
                  
                  arr.push(itemInner);
                  
                }
              });
  
            }
          }
        });


        this.render.totalPrice = 0
      Object.keys(this.render).forEach(key => {
          if (key !== 'totalPrice') {
              const item = this.render[key]
              item.price = item.data[0].price
              item.id = item.data[0].id
              item.data.forEach(inner => {
                if (Number(inner.price) < Number(item.price)) {
                  
                  item.price = inner.price
                  item.id = inner.id;  
                }
              })
              this.render.totalPrice += Number(item.price)
              console.log(this.render , " ");
            }
            // console.log(item , " iteeeeeeeem");
      })




       // put vartion object in array to loop over it 
       Object.keys(this.render).forEach(key => {
         
         if (key !== 'totalPrice') {
           this.final_vartions.push(this.render[key].data )
           let current = this.render[key].price;
           let current_z = this.render[key].id;
           console.log(current_z , " " );

            for (let i = 0; i < this.render[key].data.length; i++) {
              const element = this.render[key].data[i];
              const element_z = this.render[key].id;
             
                
              
              if (current == element.price && current_z == element.id) {
                 this.default_vartions.push(element);
                  
               this.vartion_map.set( element.extra_fields.title ,element.price)

        
          
                }
                  
                }
             
       
          }
          
        })
 
        
        

        this.vartion_map.forEach((value: string, key: string) => {
          this.newResult   = this.newResult  + parseFloat(value);
        });
        

        this.singleProduct.price = parseFloat(this.singleProduct.price)  + this.render.totalPrice;
        // this.main_price = parseFloat(this.main_price) + this.render.totalPrice;
      
      
          
        } else{
          this.singleProduct=[];
        }
        loading.dismiss();
      }
      , error => {
        sessionData.clearDateFromLocalStorage();
        this.app.openPage('LoginPage')
        loading.dismiss();

      });

      console.log(this.default_vartions , 'default');
      

  }


  // add wishes

  addWihes() {
    let loading = this.loading.create({
      content: this.pleaseWait
    });
    loading.present();
    this.ProductsService.addWish(this.productValue.id).subscribe(
      data => {
        this.presentToast(data.Message);
        var heart = document.getElementById('heart');
        heart.classList.toggle('red-heart');
        loading.dismiss();
      }
      , error => {
        // console.log("sss: ",error)
        sessionData.clearDateFromLocalStorage();
        this.app.openPage('LoginPage')
        loading.dismiss();

      });
  }

//add to cart

addCart() {
  
  
  // this.singleProduct.quantity=this.currentNumber;
  this.singleProduct.currentQuantity=this.currentNumber;

  this.singleProduct.variations = this.default_vartions;
  
    console.log( this.singleProLocal , " local ");
    
  this.singleProLocal.push(this.singleProduct);
  localStorage.setItem('carts',  JSON.stringify(this.singleProLocal) + "");
  
  
  this.presentToast('Product is add successfully')
  this.app.openPage('HomePage');

}



  AddVartion(e){

    this.final_res  = 0
    this.vartion_map.forEach((value: string, key: string) => {
      this.final_res   = this.final_res  + parseFloat(value);
   });

 
      
        
    this.singleProduct.price =  this.singleProduct.price  - this.final_res ;
        
    this.vartion_map.set(e.extra_fields.title , e.price)

    this.newResult  = 0

    this.vartion_map.forEach((value: string, key: string) => {
      this.newResult   = this.newResult  + parseFloat(value);
   });


   


        let index = 0 ;
        for (let i = 0; i < this.default_vartions.length; i++) {
          const element = this.default_vartions[i];
          if ( element.field_id === e.field_id) {
              index = i ;
          }

    
        }
      this.default_vartions[index] = e;
        
        
    
       
         
        if (this.currentNumber == 0) {
          this.singleProduct.price =  parseFloat(this.singleProduct.price) +  this.newResult 
          
        } else {
          
          this.singleProduct.price =  parseFloat(this.singleProduct.price) + ( this.newResult * this.currentNumber )
        }
 
   
   
     
  }

  // toast
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 1700,
      position: 'top'
    });
    toast.present();
  }


  goToHomePage(){
    this.navCtrl.push('HomePage',{flag:true,search:this.search})
  }

}
