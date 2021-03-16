import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SocialAuthService } from "angularx-social-login";
import { AuthService} from '../core/services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService:AuthService , private socialAuthService:SocialAuthService) { }

 
  loggedIn: boolean;
  fbPicture: any;
  

  ngOnInit(): void {
   
   if(this.authService.isUserLoggedIn()){
    this.router.navigate(['/dashboard']);
   }
  }


  signIn(val): void {
      this.authService.login(val)
  }



}
