import { ProfileuserServiceProvider } from './../../providers/profileuser-service/profileuser-service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LanguagesPage } from './languages';

@NgModule({
  declarations: [
    LanguagesPage,
  ],
  imports: [
    IonicPageModule.forChild(LanguagesPage),
  ],
  providers: [ProfileuserServiceProvider]

})
export class LanguagesPageModule { }
