import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Order } from './interfaces/order';
import { FormGroup } from '@angular/forms';
import { OrdersService } from './services/orders.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { OrdersDataSourceService } from './services/orders-data-source.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'user_id','name','email','phone' ,'total','status','acciones'];
  dataSource: OrdersDataSourceService;///modificado para paginacion

  pageSize = 20;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  totalResut: any;

  constructor(
    private _orderService: OrdersService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute


  ) { }
  ngOnInit(): void {
    this.dataSource = new OrdersDataSourceService(this._orderService);////paginacion
    this.dataSource.loadOrders('', 'asc', 1, this.pageSize);
    this.totalResut = this._orderService.totalResult$
  }

  ngAfterViewInit() {
    this.paginator.page
        .pipe(
            tap(() => this.loadOrderPage())
        )
        .subscribe();
  }

  loadOrderPage() {
    this.dataSource.loadOrders(
        '',
        'asc',
        this.paginator.pageIndex,
        this.paginator.pageSize
        );

    // this.totalResut = this.orderService.totalResult$

  }


  update(id:number) {
    const data ="" //= this.formAdd.value;
    
    this._orderService.updateOrder(id, data).subscribe(
      res => {
        console.log(res);
        this._orderService.openSnackBar('success', `Tipo ${res.name} Actualizado con éxito!!`)
        this.loadOrderPage()
        // this.formAdd.reset();
      },
      err => {
        console.log(err);

        this._orderService.openSnackBar('error', `${err}`)
      },
    )
  }  

}
