import { TranslateModule } from '@ngx-translate/core';
import { AuthentcationServices } from './../../providers/authentcation-services';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangepasswordPage } from './changepassword';

@NgModule({
  declarations: [
    ChangepasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ChangepasswordPage),TranslateModule.forChild({})
  ],
  providers:[AuthentcationServices]
})
export class ChangepasswordPageModule {}
