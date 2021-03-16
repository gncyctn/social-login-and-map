import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CurrentUser } from '../models';


import { SocialAuthService } from 'angularx-social-login';
import { FacebookLoginProvider,GoogleLoginProvider } from 'angularx-social-login';

@Injectable()
export class AuthService  {
  public token: string;
  public userLoggedIn = false;
  public tokenTrueFalse: any;
  public user :any;
  public currentUser: CurrentUser;

  constructor(
    public http: HttpClient,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {
    

  }

  isUserLoggedIn() {
    
    this.tokenTrueFalse = localStorage.getItem('token');
    if (this.tokenTrueFalse) {
      this.userLoggedIn = true;
    } else {
      this.userLoggedIn = false;
    }
    return this.userLoggedIn
  }

  login(val){

    if(val == 'google'){
        this.googleLogIn()
    } else if(val == 'facebook'){
        this.facebookLogIn()
    }
    
    
  }


  facebookLogIn(){
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(data => {
        
        this.user = data
        this.currentUser = data;
        localStorage.setItem('token', this.user.authToken);
        localStorage.setItem('userData', JSON.stringify(this.user.response));

        this.router.navigate(['dashboard']);
        return this.userLoggedIn = true;
        
    });
  }

  googleLogIn(){
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data => {
        
        this.user = data
        this.currentUser = data
        localStorage.setItem('token', this.user.idToken);
        localStorage.setItem('userData', JSON.stringify(this.user));

        this.router.navigate(['dashboard']);
        return this.userLoggedIn = true;
      
    });
  }
  logout(){
    this.currentUser = null;
    this.userLoggedIn = false;
    localStorage.removeItem('token');
    localStorage.removeItem('userData');

    this.router.navigate(['/login']);
  }
 

  getCurrentUser() {
      
    const currentUserInfo = JSON.parse(localStorage.getItem('userData'));
    if (currentUserInfo) {

      this.currentUser = currentUserInfo;
    }
    return currentUserInfo;
  }


}
