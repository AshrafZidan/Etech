import { ProductsServiceProvider } from './../../providers/products-service/products-service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartPage } from './cart';

@NgModule({
  declarations: [
    CartPage,
  ],
  imports: [
    IonicPageModule.forChild(CartPage),
  ],
  providers:[ProductsServiceProvider]
})
export class CartPageModule {}
