import { TranslateModule } from '@ngx-translate/core';
import { ProductsServiceProvider } from './../../providers/products-service/products-service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderDetailsPage } from './order-details';

@NgModule({
  declarations: [
    OrderDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderDetailsPage),TranslateModule.forChild({})
  ],
  providers:[ProductsServiceProvider]

})
export class OrderDetailsPageModule {}
