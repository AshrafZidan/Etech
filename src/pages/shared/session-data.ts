

export class sessionData {

  public static is_log: boolean = false;
  public static language: string = 'en';
  public static currency: string = 'GBP';
  public static currencySymbol: string = '';
  public static userToken: string;

  public static userName: string;
  public static token: string;


  static saveDataInLocalStorage() {
    // localStorage.setItem('userId', sessionData.userId + "");
    // localStorage.setItem('userName', sessionData.userName + "");
    // localStorage.setItem('userPhone', sessionData.userPhone + "");
    // localStorage.setItem('userGender', sessionData.userGender + "");
    // localStorage.setItem('userType', sessionData.userType + "");
    // localStorage.setItem('userpictureToken', sessionData.userpictureToken + "");
    // localStorage.setItem('userNumberNotification', sessionData.userNumberNotification + "");
    // localStorage.setItem('userPassword', sessionData.userPassword + "");
    // localStorage.setItem('userVerificationNeeded', sessionData.userVerificationNeeded + "");
    // localStorage.setItem('notificationId', sessionData.notificationId + "");
    // localStorage.setItem('passwordNeedChange', sessionData.passwordNeedChange + "");
    localStorage.setItem('Language', sessionData.language + "");
    localStorage.setItem('currency', sessionData.currency + "");
    localStorage.setItem('currencySymbol', sessionData.currencySymbol + "");
    localStorage.setItem('is_log', sessionData.is_log + "");
    localStorage.setItem('userToken', sessionData.userToken + "");
    localStorage.setItem('userName', sessionData.userName + "");
    localStorage.setItem('token', sessionData.token + "");



  }

  static getDataFromLocalstorage() {
    // sessionData.userId = Number(localStorage.getItem('userId'));
    // sessionData.userName = localStorage.getItem('userName');
    // sessionData.userPhone = localStorage.getItem('userPhone');
    // sessionData.userGender = localStorage.getItem('userGender');
    // sessionData.userPassword = localStorage.getItem('userPassword');
    // sessionData.userType = localStorage.getItem('userType');
    // sessionData.userpictureToken = localStorage.getItem('userpictureToken');
    // sessionData.userNumberNotification = Number(localStorage.getItem('userNumberNotification'));
    // sessionData.userVerificationNeeded = Boolean(localStorage.getItem('userVerificationNeeded'));
    // sessionData.notificationId = localStorage.getItem('notificationId');
    // sessionData.passwordNeedChange = localStorage.getItem('passwordNeedChange');
    sessionData.language = localStorage.getItem('Language');
    sessionData.currency = localStorage.getItem('currency');
    sessionData.is_log = Boolean(localStorage.getItem('is_log'));
    sessionData.userToken = localStorage.getItem('userToken');
    sessionData.token = localStorage.getItem('token');
    sessionData.userName = localStorage.getItem('userName');

  }

  static saveDataInsession(data) {
    // sessionData.userId = data.userDetails.userId;
    // sessionData.userName = data.userDetails.userName;
    // sessionData.userGender = data.userDetails.gender;
    // sessionData.userNumberNotification = data.userDetails.numOfNotifications;
    // sessionData.userPhone = data.userDetails.phone;
    // sessionData.userType = data.userDetails.type;
    // sessionData.userpictureToken = data.userDetails.picture_url;
    // sessionData.userToken = data.tkn;
    // sessionData.userVerificationNeeded = data.userDetails.validMobile;
    // sessionData.notificationId = data.userDetails.notificationId;
    // sessionData.passwordNeedChange = data.userDetails.resetPasswordNeeded;
  
    if (data.language == "Arabic") {
      sessionData.language = "ar";
    } else {
      sessionData.language = "en";
    }
    sessionData.userToken = data.token;
    if (data.currency == null || data.currency == undefined || data.currency == '') {
      sessionData.currency = 'GBP';
    } 
    sessionData.is_log = true;
    sessionData.userName = data.name;
    sessionData.token = data.token;
    sessionData.currencySymbol = data.symbol;
    

  }

  static saveDataInSingUpToVerifyCode(userId: number, userPhone: string, userPassword: string, userName: string) {
    // sessionData.userId = userId;
    // sessionData.userPhone = userPhone;
    // sessionData.userPassword = userPassword;
    // sessionData.userName = userName;
    // sessionData.userVerificationNeeded = true;
    // localStorage.setItem('userName', sessionData.userName + "");
    // localStorage.setItem('userPhone', sessionData.userPhone + "");
    // localStorage.setItem('userPassword', sessionData.userPassword + "");
    // localStorage.setItem('userId', sessionData.userId + "");
    // localStorage.setItem('userVerificationNeeded', sessionData.userVerificationNeeded + "");

  }

  static saveDataInForgetPassToChangePass(userId: number, userPhone: string, passwordNeedChange: string) {
    // sessionData.userId = userId;
    // sessionData.userPhone = userPhone;
    // sessionData.passwordNeedChange = passwordNeedChange;
    // localStorage.setItem('userId', sessionData.userId + "");
    // localStorage.setItem('userPhone', sessionData.userPhone + "");
    // localStorage.setItem('passwordNeedChange', sessionData.passwordNeedChange + "");
  }
  static saveDataInLoginToVerifyCode(userPassword: string) {
    // sessionData.userPassword = userPassword;
    // localStorage.setItem('userPassword', sessionData.userPassword + "");
  }

  static clearDateFromLocalStorage() {
    // localStorage.setItem('userId', "");
    // localStorage.setItem('userName', "");
    // localStorage.setItem('userPhone', "");
    // localStorage.setItem('userGender', "");
    // localStorage.setItem('userType', "");
    // localStorage.setItem('userpictureToken', "");
    // localStorage.setItem('userNumberNotification', "");
    // localStorage.setItem('userToken', "");
    // localStorage.setItem('userPassword', "");
    // localStorage.setItem('userVerificationNeeded', "");
    // localStorage.setItem('passwordNeedChange', "");
    localStorage.removeItem('is_log');
    localStorage.removeItem('userToken');
    localStorage.removeItem('token');
    localStorage.removeItem('currency');
    localStorage.removeItem('carts');
    localStorage.removeItem('userName');
    localStorage.removeItem('Category')


  }

  static clearDataInsession() {
    // sessionData.userId = null;
    // sessionData.userName = "";
    // sessionData.userGender = "";
    // sessionData.userNumberNotification = null;
    // sessionData.userPhone = "";
    // sessionData.userType = "";
    // sessionData.userpictureToken = "";
    // sessionData.userVerificationNeeded = null;
    // sessionData.notificationId = "";
    // sessionData.passwordNeedChange = "";
    sessionData.userToken = "";
    sessionData.token = ""; 
    sessionData.currency = "";
    sessionData.is_log = false;
    sessionData.userName = "";
  }


  // static setNotifyIdInSession(notifyId){
  //     sessionData.notificationId=notifyId;

  // }

  // static setNotifyIdInLocalStorage(){
  //     localStorage.setItem('notificationId', sessionData.notificationId + "");

  // }
  static checkPermission(navController, code) {
    if (code == 1013) {
      navController.setRoot('Language');
      sessionData.clearDateFromLocalStorage();
      sessionData.getDataFromLocalstorage();
    }
  }



}
