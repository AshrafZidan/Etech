import { ProfileuserServiceProvider } from './../providers/profileuser-service/profileuser-service';
import { AuthentcationServices } from './../providers/authentcation-services';
import { AccordionComponent } from './../components/accordion/accordion';
import { ExpandableComponent } from './../components/expandable/expandable';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavParams, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Http,HttpModule } from '@angular/http';
import { ProductsServiceProvider } from './../providers/products-service/products-service';


// check the network
import { Network } from '@ionic-native/network';


import { MyApp } from './app.component';
import { GlobalState } from './global.state';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageService } from '../providers/language.service';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SelectSearchableModule } from 'ionic-select-searchable';
import { CategoriesServiceProvider } from '../providers/categories-service/categories-service';

// import { CategoriesServiceProvider } from '../providers/categories-service/categories-service';
// import { ProfileuserServiceProvider } from '../providers/profileuser-service/profileuser-service';
// import { ProductsServiceProvider } from '../providers/products-service/products-service';




export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AccordionComponent,
    MyApp ,


  ],
  imports: [
    SelectSearchableModule,

    BrowserModule,HttpModule,
    IonicModule.forRoot(MyApp),
    NgbModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }) ,

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AccordionComponent
  ],
  providers: [
    StatusBar,GlobalState,
    ProfileuserServiceProvider,
    AuthentcationServices,
   

    ProductsServiceProvider,
    CategoriesServiceProvider,
      SplashScreen,LanguageService,Network,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    // CategoriesServiceProvider,
    // ProfileuserServiceProvider,
    // ProductsServiceProvider
  ]
})
export class AppModule {}
