import { TranslateModule } from '@ngx-translate/core';
import { ProfileuserServiceProvider } from './../../providers/profileuser-service/profileuser-service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserprofilePage } from './userprofile';

@NgModule({
  declarations: [
    UserprofilePage,
  ],
  imports: [
    IonicPageModule.forChild(UserprofilePage),TranslateModule.forChild({})
  ],
  providers:[ProfileuserServiceProvider]
})
export class UserprofilePageModule {}
