import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodsService {



  constructor(
    private _http: HttpClient,
    private _snackBar: MatSnackBar
  ) { }




  getPayMethods() {
    return this._http.get<any[]>(`${environment.API}pay-methods`).pipe(
      take(1)
    )
  }

  addPayMethod(data) {
    return this._http.post<any>(`${environment.API}pay-methods`, data).pipe(
      take(1)
    )
  }

  deletePayMethod(id) {
    return this._http.delete<any>(`${environment.API}pay-methods/${id}`).pipe(
      take(1)
    )
  }
  updatePayMethod(id, data){
    return this._http.post<any>(`${environment.API}pay-methods/${id}`, data).pipe(
      take(1)
    )
  }



}
