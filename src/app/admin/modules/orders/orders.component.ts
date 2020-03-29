import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Order } from './interfaces/order';
import { FormGroup } from '@angular/forms';
import { OrdersService } from './services/orders.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { OrdersDataSourceService } from './services/orders-data-source.service';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DialogFormOrderComponent } from './dialog-form-order/dialog-form-order.component';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, AfterViewInit {
  remplace = /_/g;

  displayedColumns: string[] = ['id', 'date', 'user_id', 'name', 'email', 'phone', 'total', 'status', 'acciones'];
  dataSource: OrdersDataSourceService;///modificado para paginacion

  pageSize = 20;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('input') input: ElementRef;

  totalResut: any;

  constructor(
    private _orderService: OrdersService,
    public dialog: MatDialog


  ) { }
  ngOnInit() {
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

    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadOrderPage();
        })
      )
      .subscribe();
  }

  loadOrderPage() {
    this.dataSource.loadOrders(
      this.input.nativeElement.value,
      'asc',
      this.paginator.pageIndex,
      this.paginator.pageSize
    );

    // this.totalResut = this.orderService.totalResult$

  }


  update(id: number) {
    const data = "" //= this.formAdd.value;

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



  openDialog(data?): void {
    console.log(data);

    const dialogRef = this.dialog.open(DialogFormOrderComponent, {
      maxWidth: "100vw",
      minWidth: "600px",
      maxHeight: "100vh",
      data: { data: data }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        if (result[0].id) {

          this.update(result)
        } else {
          // this.addProduct(result)

        }
      }

    });
  }

}
