import { MyApp } from './../../app/app.component';
import { AccordionComponent } from './../../components/accordion/accordion';
import { Http } from '@angular/http';
import { Component, ViewChild, Input, Renderer } from '@angular/core';
import { IonicPage, NavController,Platform, NavParams, LoadingController } from 'ionic-angular';
import { CategoriesServiceProvider } from '../../providers/categories-service/categories-service';
import { TranslateService } from '@ngx-translate/core';
import { sessionData } from '../shared/session-data';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
AccordionComponent

/**
 * Generated class for the FilterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {
  accordionExapanded = false;
  @ViewChild("cc") cardContent: any;
 @Input('title') title: string;

  icon: string = "arrow-forward";

  information:any[];
 filterFlag ;
 rmchecked;
 FilterForm: FormGroup;

 //services parameter 
 parentes = [];
 fileds  = [];
 vartion_length;
 saved_check = [];
 public pleaseWait: string = null;


  constructor(platform: Platform,public navCtrl: NavController, public navParams: NavParams ,private http:Http , public renderer: Renderer , private app:MyApp ,
    private builder: FormBuilder,

    private loading: LoadingController,
    private translate: TranslateService ,
    private CategoriesService :CategoriesServiceProvider) {
    platform.registerBackButtonAction(() => {
      this.app.openPage('HomePage');
    });


    // this.FilterForm = builder.group({
    //   'vartions': ['', [Validators.required] ],
    //   'filters': ['', [Validators.required] ],

    
      
      
      
    // });

    this.translate.get(['pleaseWait']).subscribe((res) => {
      this.pleaseWait = res.pleaseWait;
    });

      
    if (this.navParams.get('item') == undefined) {
        this.filterFlag = false
    }
    else{
      this.filterFlag = true
      this.getVaritions();

    }
    console.log(this.navParams.get('item') , );
    

  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterPage');
  }



  


     toggleSection(i) {
      this.information[i].open = !this.information[i].open;
    }
   
    toggleItem(i, j) {
      this.information[i].children[j].open = !this.information[i].children[j].open;
    }
  back(){
    this.app.openPage('HomePage');
  }

getVaritions(){
  let loading = this.loading.create({
    content: this.pleaseWait
  });
  loading.present();

  // this.navParams.get('item').id
  this.CategoriesService.Variations(this.navParams.get('item').category_id).subscribe(data => {
    this.information = data.InnerData;
    loading.dismiss();
  }
  , error => {
    // console.log("sss: ",error)
    sessionData.clearDateFromLocalStorage();
    
    loading.dismiss();

  });

  
   

  
}
sendVartions(e , child){
  
  if (e.target.checked == true) {
    this.saved_check.push(e.target);
    this.parentes.push(e.target.value);
    this.fileds.push(child);
  }
  else{
    this.parentes.pop()
    this.fileds.pop();
  }

  

  this.vartion_length = this.parentes.length;

}

FilterService(){
  let loading = this.loading.create({
    content: this.pleaseWait
  });
  loading.present();

  // this.navParams.get('item').id
    console.log(this.parentes , this.fileds )

  this.CategoriesService.filter(this.parentes , this.fileds , sessionData.language,sessionData.currency ).subscribe(data => {
   
  
    
    loading.dismiss();
    this.navCtrl.push("HomePage" , {
      result:data.InnerData , 
      backfromFilter : true , 
      sameCategoray :this.navParams.get('item')
    })
  }
  , error => {
    // console.log("sss: ",error)
    sessionData.clearDateFromLocalStorage();
    
    loading.dismiss();

  });

}
reset(){
  
  this.saved_check.forEach((item) => {
    item.checked = false;
  })

  this.parentes.length = 0;
  this.fileds.length = 0;
  this.vartion_length =  this.parentes.length;
}  

}
