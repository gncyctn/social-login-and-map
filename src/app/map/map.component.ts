import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountryService } from '../core/services/country.service'
import { rxjsService } from '../core/services/rxjs.service'
import { Position} from '../core/models/position'
import * as $ from 'jquery';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  selectedCountry: any;

  public anchorPosition: Position;
  public rxData :any

  public mapData = this.countryService.countryName()

  
  countryName:any;
  orgData:any;
  importCountry:any;
  exportCountry:any;

  contextVal :any;

  showHideContext = false;

  public continentData = this.countryService.continentName()


  rateImport :any;
  rateExport : any;

  parentMessage = {};
  popupMessage:any;
  sendPopup:any;

  constructor(private router: Router, private countryService: CountryService,private rxxjsService:rxjsService) { 
    
    
  }

  ngOnInit(): void {

    this.orgData = this.mapData
    
    this.anchorPosition = {
      left: 0,
      top: 0
    };

    // harita hover
    var firstBgColor = ''
    $('path').mouseover(function () {
      if (firstBgColor.length == 0) {
        firstBgColor = $(this).css('fill')
      }

      $(this).css('fill', 'red')
    })

    $('path').mouseleave(function () {

      $(this).css('fill', firstBgColor)
      firstBgColor = ''
    })
  }

  sendreceiveMessage($event) {


    this.popupMessage = $event;
    this.showHideContext = this.popupMessage;
  }


  onRightClick(event) {
    
    if(event.target.id == "ocean" || event.target.id == ""){
      this.showHideContext = false
      return;
    }
    
    
    this.showHideContext = true

    // context in pozistonunu belirler
    var htmlElement =  document.getElementsByTagName("html")[0];
    this.anchorPosition.left = event.clientX
    this.anchorPosition.top = event.clientY +htmlElement.scrollTop


    // for
    this.orgData.map((x , index )=>{
      
      // ülke kısaltması 0 ıncı sırada ise
      if(event.path[1].id == ''){
        
        if(event.path[0].id.toUpperCase().indexOf(x["alpha-2"]) > -1){
          
          this.contextVal = x

          this.selectedCountry = {
            data: event,
            index: index
          }
        }
      } 
      // ülke kısaltması 1 ıncı sırada ise
      else {
        if(event.path[1].id.toUpperCase().indexOf(x["alpha-2"]) > -1){
          
          this.contextVal = x

          this.selectedCountry = {
            data: event,
            index: index
          }
        }
      }
     
    })
    
    if(this.showHideContext == true){
      this.showHideContext=false;
    }
    setTimeout(() => {
      this.showHideContext=true;
      this.parentMessage = {
        data:this.selectedCountry,
        val:this.contextVal
      }
    }, 200);
   

    return false;
  }

  

  
}
