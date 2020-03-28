import { Component, OnInit, Inject, EventEmitter, Output, AfterViewInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Product } from 'src/app/modals/product.model';
import { environment } from 'src/environments/environment';
import { OrdersService } from '../services/orders.service';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from '../interfaces/order';

@Component({
  templateUrl: './dialog-form-order.component.html',
  styleUrls: ['./dialog-form-order.component.scss']
})
export class DialogFormOrderComponent implements OnInit, AfterViewInit {
  
  remplace = /_/g;

  brand: Product[];
  dataSource: any;
  formAdd: FormGroup
  mostrar: boolean = false;
  urlFiles = `${environment.urlFiles}`;
  selectedImage: FileList;
  idUpdate: any;
  edit: boolean;
  imageSrc: any;
  brands: any;
  category: any;
  categories: any;
  dataResult : any ={form:null, image:null}
  order: any;



  constructor(
    public dialogRef: MatDialogRef<DialogFormOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _orderService: OrdersService,
    ) {}
    displayedColumns: string[] = ['id', 'name', 'quantity','price','total'];


  ngOnInit(): void {
    this.createForm();
    this.order = this.data.data;

    this.dataSource = new MatTableDataSource(this.order.productos);
    
    

    
    // if(this.data.data !== undefined){
    //   this.openEdit(this.data.data)
    //   // console.log(this.data);
      
    // }

  }
  ngAfterViewInit(){
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }

  enviar(){
    this.dialogRef.close([this.formAdd.value, this.selectedImage, this.brands, this.categories])
  }


  createForm(){
    this.formAdd = this.fb.group({
      id:[null],
      name: [null, Validators.required],
      price: [null, Validators.required],
      name_concat:[null],
      price_mayorista: [0],
      discount: [0],
      picture: [null],
      description: [null],
      stock: [null, Validators.required],
      brand_id: [null],
      category_id: [null]
    })
  }


   ///////EDIT
   openEdit(element: any) {
    
    this.edit = false;
    this.edit = true;
    var discount
    if(element.discount === null){
      discount = 0;
    }else{
      discount = element.discount;
    }
    var price_mayorista
    if(element.price_mayorista === null){
      price_mayorista = 0;
    }else{
      price_mayorista = element.discount;
    }

    this.formAdd.patchValue(
      {
        id: element.id,
        name: element.name,
        price: element.price,
        name_concat:element.name_concat,
        price_mayorista: price_mayorista,
        discount: discount,
        description: element.description,
        stock: element.stock,
        brand_id: element.brand_id,
        category_id: element.category_id
      }
      )
      this.imageSrc = `${this.urlFiles+element.picture}`


    this.idUpdate = element.id;
   
    console.log(element);

  }




      onNoClick(): void {
        this.dialogRef.close();
      }
}
