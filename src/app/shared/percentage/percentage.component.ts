import { Component, OnInit } from '@angular/core';
import { rxjsService } from '../../core/services/rxjs.service'
@Component({
  selector: 'app-percentage',
  templateUrl: './percentage.component.html',
  styleUrls: ['./percentage.component.scss']
})
export class PercentageComponent implements OnInit {
  rateImport :any;
  rateExport :any;
  rxData:any;
  constructor(private rxxjsService:rxjsService) { 

    this.rxxjsService.messageImportExport.subscribe(res=>{
      
      this.rxData= res
      
      if(Object.entries(res).length != 0 ){
        this.rate(this.rxData)
        
      }
      
    })
  }

  ngOnInit(): void {
  }

  // ithalat ihracat oranı

  rate(data){
    
    let importData = 0;
    let exportData = 0;

    data.map(x=>{
      if(x.import > 0){
        importData += 1
      }
      if(x.export > 0){
        exportData += 1
      }
      
      
    })

    
    
    let mapLength = data.length

    this.rateImport  = ((importData*100)/mapLength).toFixed(2);
    this.rateExport  = ((exportData*100)/mapLength).toFixed(2);
  }
}
