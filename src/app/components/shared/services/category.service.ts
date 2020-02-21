import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private _http: HttpClient
  ) { }


  categories(){
    return this._http.get(`${environment.API}category`).pipe(
      map( 
        (a:any) => {

          let filtra= a.filter(
            x => x.status === "ACT"
          )          
          return filtra
          
        }
      )
    )
  }

}
