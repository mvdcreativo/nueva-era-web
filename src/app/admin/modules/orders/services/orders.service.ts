import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { take, map } from 'rxjs/operators';
import { Order } from '../interfaces/order';
import { BehaviorSubject, Observable } from 'rxjs';
import { SnackBarComponent } from 'src/app/components/shared/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private _http: HttpClient,
    private _snackBar: MatSnackBar
  ) { }

    // //categoias
    getOrders() {
      return this._http.get<Order>(`${environment.API}order`).pipe(
        take(1)
      )
    }
    addOrder(data) {
      return this._http.post<Order>(`${environment.API}order`, data).pipe(
        take(1)
      )
    }
  
    deleteOrder(id) {
      return this._http.delete<Order>(`${environment.API}order/${id}`).pipe(
        take(1)
      )
    }
  
    updateOrder(id, data){
      return this._http.put<Order>(`${environment.API}order/${id}`, data).pipe(
        take(1)
      )
    }



    
  ////////PAGINACION, FILTRADO Y ORDEN, ANGULAR MATERIAL

  private totalResultSubject =  new BehaviorSubject<number>(null);
  public totalResult$ = this.totalResultSubject.asObservable();

  findOrders(filter = '', sortOrder = 'asc', pageNumber= 1 , pageSize = 20):  Observable<Order[]> {

      return this._http.get(`${environment.API}order`, {
        params: new HttpParams()        
              .set('page', pageNumber.toString())
              .set('filter', filter)
              .set('sortOrder', sortOrder)
              .set('pageSize', pageSize.toString())
              
      }).pipe(
          map(
            (res:any) =>  {
              res["payload"] = res;
              this.totalResultSubject.next(res.total)
              return res["payload"];
            }
            )
      );
  }
///////////////////////////////////////////////////////////
  ////////////////////
  openSnackBar(estadoRes, message: string) {
    let classToast: string;
    switch (estadoRes) {
      case "success":
        classToast = "toastSuccess"
        break;
      case "warn":
        classToast = "toastWarn"
        break;
      case "error":
        classToast = "toastError"
        break;

      default:
        classToast = "toastError"
        break;
    }

    const durationSeconds = 5;
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: message,
      panelClass: [classToast],
      verticalPosition: 'top',
      duration: durationSeconds * 1000,
    });
  }
}
