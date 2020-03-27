import { TranslateModule } from '@ngx-translate/core';
import { ProductsServiceProvider } from './../../providers/products-service/products-service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),TranslateModule.forChild({})
  ],
  providers: [ProductsServiceProvider]
})
export class HomePageModule {}
