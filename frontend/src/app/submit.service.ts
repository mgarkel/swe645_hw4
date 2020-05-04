import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubmitService {

  url = '';

  constructor(private _http: HttpClient) { }

  enroll(data){
    return this._http.post<any>(this.url, data);
  }
}
