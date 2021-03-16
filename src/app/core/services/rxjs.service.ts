

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()

export class rxjsService {

    public messageImportExport = new BehaviorSubject({})

    constructor(public http: HttpClient) {


    }

    changeUser(params) {

        this.messageImportExport.next(params);
    }



}
