import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Order } from '../interfaces/order';
import { OrdersService } from './orders.service';
import { CollectionViewer } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersDataSourceService {

  private ordersSubject = new BehaviorSubject<Order[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

 

  public loading$ = this.loadingSubject.asObservable();


  constructor(private orderServices: OrdersService) {}


  connect(collectionViewer: CollectionViewer): Observable<Order[]> {
    return this.ordersSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.ordersSubject.complete();
      this.loadingSubject.complete();
  }

  loadOrders(filter= '', sortDirection='asc', pageIndex= 1, pageSize= 20) {

    this.loadingSubject.next(true);
    this.orderServices.findOrders(filter, sortDirection, pageIndex, pageSize).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((orders:any) => {
        console.log(orders);
        const data = orders.data
        
        this.ordersSubject.next(data)
      })

  }  
}
