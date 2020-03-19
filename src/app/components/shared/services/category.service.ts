import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public categorias$ :  BehaviorSubject<any> = new BehaviorSubject([]);

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
          this.categorias$.next(filtra)          
          return filtra

          
        }
      )
    )
  }

}
