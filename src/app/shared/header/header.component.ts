import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';
import { CurrentUser } from '../../core/models/currentUser';
import { Position} from '../../core/models/position'
import { AuthService } from '../../core/services/auth.service'
import Swal from 'sweetalert2'
import { CountryService } from '../../core/services/country.service'
import { SelectApp } from './app-selectapp';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: CurrentUser;
  user: any
  platform: any;
  listBox = false
  public anchorPosition: Position;
  filter: SelectApp = new SelectApp();
  public countryName = this.countryService.countryName()
  showHideContext = false;
  contextVal: any;
  selectedCountry: any;
  parentMessage = {};
  popupMessage: any;
  sendPopup: any;

  constructor(private socialAuthService: SocialAuthService, private authService: AuthService, private countryService: CountryService) { }

  ngOnInit(): void {

    this.currentUser = this.authService.getCurrentUser()
   

    this.platform = this.currentUser.provider
    this.user = this.currentUser

 
  
    this.anchorPosition = {
      left: 0,
      top: 0
    };

  }

  // input karakter okuma
  eventHandler(event) {
    if (event.length >= 3) {
      this.listBox = true;
    } else {
      this.listBox = false;
    }
  }


  // çıkış
  signOut(): void {

    Swal.fire({
      title: 'Çıkış yapmak istediğinizden emin misiniz?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Evet',
      cancelButtonText: 'Hayır'
    }).then((result) => {
      if (result.isConfirmed) {
        this.socialAuthService.signOut()

        this.authService.logout()
      }
    })

  }

  onRightClick(event) {
    this.showHideContext = true

    // context in pozistonunu belirler
    var htmlElement = document.getElementsByTagName("html")[0];
    this.anchorPosition.left = event.clientX
    this.anchorPosition.top = event.clientY + htmlElement.scrollTop

    // for
    this.countryName.map((x) => {

      if (x.trVal == event.target.textContent) {

        this.contextVal = x

        this.selectedCountry = {
          data: x,
          index: this.contextVal.trVal
        }

      }
    })

    if (this.showHideContext == true) {
      this.showHideContext = false;
    }
    setTimeout(() => {
      this.showHideContext = true;
      this.parentMessage = {
        data: this.selectedCountry,
        val: this.contextVal
      }
    }, 200);
    return false;
  }

  // contexten gelen mesaj alanı
  sendreceiveMessage($event) {
    this.popupMessage = $event;
    this.showHideContext = this.popupMessage;
  }

}
