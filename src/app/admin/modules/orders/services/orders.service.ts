import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { take, map } from 'rxjs/operators';
import { Order } from '../interfaces/order';
import { BehaviorSubject, Observable, Subject, Observer } from 'rxjs';
import { SnackBarComponent } from 'src/app/components/shared/snack-bar/snack-bar.component';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

    
    
  cuotas$ =  new BehaviorSubject<number>(null);
  id_medio_pago$ = new BehaviorSubject<number>(null);

  constructor(
    private _http: HttpClient,
    private _snackBar: MatSnackBar,
    public authService : AuthService
  ) { }


    // //Orders
    getOrders() {
      return this._http.get<Order[]>(`${environment.API}order`).pipe(
        take(1)
      )
    }
    getOrder(id) {
      return this._http.get<Order>(`${environment.API}order/${id}`).pipe(
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


    // registrarCliente(data): Observable<any>{

    //   const user = this.authService.currentUserValue;


    //   if(user.user.id_cliente_cobrosya === null){
    //     return this._http.post<any>(`${environment.API}registro_cliente_cobrosya`, data).pipe(
    //       take(1)
    //     )
    //   }
      
      
    // }

    // crearTalon(data,id_medio,cuotas){

    //   const newData = {
    //     order: data,
    //     cuotas: cuotas,
    //     method: id_medio,
    //     user: this.authService.currentUserValue.user,
    //     urlRedirect : `${environment.urlRedirectPago}${data.id}/${id_medio}`
    //   }
    //   console.log(newData);
      
    //   const user = this.authService.currentUserValue;

    //   if(user.user.id_cliente_cobrosya){
    //     return this._http.post<any>(`${environment.API}crear_talon_cobrosya`, newData).pipe(
    //       take(1)
    //     )
    //   }
    // }


    redirectNavegadorCobro(data){

            this.redirectForm(`${environment.urlPago}/${data.id}`);

    }
    
/*******rREDIRECCIONAMIENTO URL PAGO */
    redirectForm(url: string) {
      var mapForm = document.createElement("form");
      mapForm.target = "_blank";
      mapForm.method = "GET"; // or "post" if appropriate
      mapForm.action = url;

    document.body.appendChild(mapForm);
    mapForm.submit();
  }
/************ */


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
