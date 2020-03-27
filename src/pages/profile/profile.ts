import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// General Classes /////////////////////////////////////////////
import { MyApp } from '../../app/app.component';


/**
 * Generated class for the Profile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile {


  mobImage:string = 'assets/icon/Mobile-02.png';
  deskmage:string = 'assets/icon/Desktop-02.png';


 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// constructor ///////////////////////////////////////////////

  constructor(
    public app: MyApp,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.deskmage = this.deskmage.replace('-02','-01');


    // this.DeskChange();
  }




  openPage(namepage){
    this.app.openPage(namepage);
  }
  mobileChange(){
    var mobBox = document.getElementById('two');
    if(this.mobImage.includes('-02')){
    var ss = document.getElementById('one');

      mobBox.classList.add('actived');
      ss.classList.remove('actived');

      this.mobImage = this.mobImage.replace('-02','-01');
      this.deskmage = this.deskmage.replace('-01','-02');


    }
    else{
      mobBox.classList.remove('actived');
      this.mobImage = 'assets/icon/Mobile-02.png';

    }



  }


  DeskChange(){
    var mobBox = document.getElementById('one');
    if(this.deskmage.includes('-02')){
    var dd = document.getElementById('two');

      mobBox.classList.add('actived');
      dd.classList.remove('actived');
      this.deskmage = this.deskmage.replace('-02','-01');
      this.mobImage = this.mobImage.replace('-01','-02');


    }
    else{
      mobBox.classList.remove('actived');
      this.deskmage = 'assets/icon/Desktop-02.png';

    }



  }





}
