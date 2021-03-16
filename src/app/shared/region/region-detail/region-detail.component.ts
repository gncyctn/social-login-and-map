import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { CountryService } from '../../../core/services/country.service'

@Component({
  selector: 'app-region-detail',
  templateUrl: './region-detail.component.html',
  styleUrls: ['./region-detail.component.scss']
})
export class RegionDetailComponent implements OnInit {
id:any;
public continentsData = this.countryService.continentName()
public mapData = this.countryService.countryName()

regionList = []
regionName:any;
  constructor(private route: ActivatedRoute, private countryService:CountryService) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      
      this.id = params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
  });

  this.continentsData.map(x=>{
    if(x.trRegion == this.id){
      this.regionName = x.region
    }
  })

  this.mapData.map(x=>{
    
    
      if(this.regionName == x.region){
        this.regionList.push(x)
        
      }
    
  })

 
  }

}
