import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { AuthService } from '../services/auth.service';
import * as _ from 'lodash';

@Injectable()
export class AuthGuard implements CanActivate {
  public tokenTrueFalse: any;
  public userLoggedIn = false;
  constructor(
    private router: Router, private authService:AuthService ) { }

  canActivate(route: ActivatedRouteSnapshot, ): boolean {
    
    const expectedRoute = route.firstChild.routeConfig.path;


   

    if (this.authService.isUserLoggedIn()) {
/*
      if(expectedRoute == 'login'){
        this.router.navigate(['/dashboard']);
        return
      }
      */
      if (this.checkPagePermission('/' + expectedRoute)) {

        return true;
      } else {

        this.router.navigate(['/login']);
        return false;
      }
    }

    if (window.location.pathname != "/login") {

      localStorage.UrlState = window.location.href
    }
    // not logged in so redirect to login page

    window.location
    this.router.navigate(['/login']);
    return false;




  }

  checkPagePermission(pageRoute: string) {

    let havePermission = true;

    return havePermission;
  }

}
