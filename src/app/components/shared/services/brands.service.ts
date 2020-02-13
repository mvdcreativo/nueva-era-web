import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor( private _http: HttpClient) { }


  categories(){
    return this._http.get(`${environment.API}brand`)
  }
}
