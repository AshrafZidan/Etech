import { TranslateModule } from '@ngx-translate/core';
import { ProductsServiceProvider } from './../../providers/products-service/products-service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllOrdersPage } from './all-orders';

@NgModule({
  declarations: [
    AllOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(AllOrdersPage),TranslateModule.forChild({})
  ],
  providers:[ProductsServiceProvider]
})
export class AllOrdersPageModule {}
