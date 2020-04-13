import { Component, OnInit, Inject, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Product } from 'src/app/modals/product.model';
import { environment } from 'src/environments/environment';
import { OrdersService } from '../services/orders.service';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from '../interfaces/order';
import { AuthService } from 'src/app/auth/auth.service';
import { CurrentUser, User } from 'src/app/auth/interfaces/user';

@Component({
  templateUrl: './dialog-form-order.component.html',
  styleUrls: ['./dialog-form-order.component.scss']
})
export class DialogFormOrderComponent implements OnInit {

  remplace = /_/g;

  brand: Product[];
  dataSource: any;
  statusForm: FormGroup
  mostrar: boolean = false;
  urlFiles = `${environment.urlFiles}`;
  selectedImage: FileList;
  idUpdate: any;
  edit: boolean;
  imageSrc: any;
  brands: any;
  category: any;
  categories: any;
  dataResult: any = { form: null, image: null }
  order: any;
  status: any;
  user: User;
  auth: boolean;



  constructor(
    public dialogRef: MatDialogRef<DialogFormOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _orderService: OrdersService,
    private authService: AuthService
  ) { }
  displayedColumns: string[] = ['id', 'name', 'quantity', 'price', 'total'];


  ngOnInit(): void {
    this.order = this.data.data;

    this.status = this._orderService.getStatus();
    
    this.dataSource = new MatTableDataSource(this.order.productos);
    
    this.createForm();

    this.user = this.authService.currentUserValue.user;
    if(this.user.role === "ADM"){
      this.auth = true
    }

    // if(this.data.data !== undefined){
    //   this.openEdit(this.data.data)
    //   // console.log(this.data);

    // }

  }


  updateStatus(){
    console.log(this.statusForm.value);

    this._orderService.updateOrder(this.order.id, this.statusForm.value).subscribe(
      res => console.log(res)
      
    );
    
  }


  createForm() {
    this.statusForm = this.fb.group({
      status: [this.order.status.id],
    })
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
