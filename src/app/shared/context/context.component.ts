import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { CountryService } from '../../core/services/country.service';
import { rxjsService} from '../../core/services/rxjs.service'
import Swal from 'sweetalert2'
@Component({
  selector: 'app-context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.scss']
})
export class ContextComponent implements OnInit {
  public mapData = this.countryService.countryName();
  orgData:any;
  selectedCountry:any;

  @Input() childMessage;
  @Input() title: string;
  message: any;
  contextVal:any;
  @Output() messageEvent = new EventEmitter<string>();

  
  constructor(private countryService:CountryService, private rxxjsService:rxjsService) { }

  ngOnInit(): void {
    
    this.orgData = this.mapData
    this.selectedCountry =  this.childMessage.data
    this.contextVal = this.childMessage.val

  }

  receiveMessage($event) {
    
    this.message = $event;
  }
  onClickedOutside(e: Event) {
    this.message =  false,
   
    this.messageEvent.emit(this.message);
  }


  // menü işlemleri

  // ihracat
  export(val) {
    
    
    let index = this.selectedCountry.index

    // eğer data verisi header dan geliyorsa if bloğuna girer
    if(index.length > 3){
      this.orgData.map((x , value)=>{
        
        if(x.trVal == index){
          
           return index = value
        }
      })
    } 
    
    let exportVal = this.orgData[index].export
    
    if(this.orgData[index].import > 0){
      return Swal.fire(
        'Dikkat',
        "İhracat yapabilmek için lütfen ithalatı 0'a indiriniz. ",
        'warning'
      )
    }
    if(this.selectedCountry.data.target != undefined){
      this.selectedCountry.data.target.style.fill = 'green'

    }
    
    if(val == 'up'){
      this.orgData[index].export += 1
      exportVal = this.orgData[index].export 
    } else {
      if(exportVal != 0){
        this.orgData[index].export -= 1
        exportVal = this.orgData[index].export
      } 
    }

    if(exportVal == 0){
      if(this.selectedCountry.data.target != undefined){
        this.selectedCountry.data.target.style.fill = 'rgb(207, 207, 207)'
  
      }
      
    }

    const params = {
      import: this.orgData[index].import,
      export: this.orgData[index].export
    }

    // veriler rxjs üzerinden dağıtılır
    this.rxxjsService.messageImportExport.next(this.orgData);
  
    
  }

  // ithalat
  import(val) {

    let index = this.selectedCountry.index
    if(index.length > 3){
      this.orgData.map((x , value)=>{
        
        if(x.trVal == index){
          
           return index = value
        }
      })
    } 

    let importVal = this.orgData[index].import
    
    if(this.orgData[index].export > 0){
      return Swal.fire(
        'Dikkat',
        "İthalat yapabilmek için lütfen ihracatı 0'a indiriniz. ",
        'warning'
      )
    }
    if(this.selectedCountry.data.target != undefined){
    this.selectedCountry.data.target.style.fill = 'blue'
    }

    if(val == 'up'){
      this.orgData[index].import += 1
      importVal = this.orgData[index].import
    } else {
      if(importVal != 0){
        this.orgData[index].import -= 1
        importVal = this.orgData[index].import
      }
    }

    if(importVal == 0){
      if(this.selectedCountry.data.target != undefined){
      this.selectedCountry.data.target.style.fill = 'rgb(207, 207, 207)'
    }
    }
    this.rxxjsService.messageImportExport.next(this.orgData);
   
  }

  // not ekleme alanı
  async addNote()  {
    var inputValue = this.orgData[this.selectedCountry.index].note
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Message',
      inputValue: inputValue,
      inputPlaceholder: 'Type your message here...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    })
    
    if (text) {
      Swal.fire(text)
      this.orgData[this.selectedCountry.index].note = text
      this.rxxjsService.messageImportExport.next(this.orgData);

    }
  }

  // ülke bilgilerini silme   this.contextVal.name +
  deleteInfo() {
    Swal.fire({
      title: 'Emin misiniz?',
      text: "ülkesi ile ilgili olan tüm veriler silinecektir.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Evet!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Silindi!',
          '',
          'success'
        )
      }
      this.selectedCountry.data.target.style.fill = 'rgb(207, 207, 207)'
      this.orgData[this.selectedCountry.index].export = 0
      this.orgData[this.selectedCountry.index].import = 0
      this.orgData[this.selectedCountry.index].note = ''
      this.rxxjsService.messageImportExport.next(this.orgData);
    })
    
  }
}
