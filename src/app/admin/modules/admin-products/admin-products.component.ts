import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Product } from 'src/app/modals/product.model';
import { ProductAdminService } from './services/product-admin.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogFormComponent } from './dialog-form/dialog-form.component';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  brand: Product[];
  displayedColumns: string[] = ['id', 'name', 'marca', 'categoria', 'price', 'state', 'acciones'];
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
  nameConcat: any = { brand_id: null, vehicle_model_id: null, vehicle_sub_model_id: null };
  dataReturnDialog: any
  dataUpdate: any;


  constructor(
    private _productService: ProductAdminService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.getProduct();
    


  }


  getProduct() {
    this._productService.getProductos().subscribe(
      (res: any) => {
        this.brand = res;

        this.brand.sort((a, b) => {
          return (b.id - a.id)
        })

        this.dataSource = new MatTableDataSource(this.brand);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  // onSubmit() {
  //   this.addProduct();
  // }
  idToName(campo: string, arrCampo: any, data) {

    let campoName = arrCampo.filter(item => item.id == data[campo])
    this.nameConcat[campo] = `${campoName[0].name}`

  }

  ///PAram dataDialog es un array, en posicion 0 = form , 1= selectImage, 2= brands[] , 3=categories[]
  addProduct(dataDialog: any) {


    ////FORMAMOS NAME_CONCAT pasando de id a sus nombres
    const dataN = dataDialog[0];
    if (dataN.brand_id) {
      this.idToName('brand_id', dataDialog[2], dataN)
    }
    if (dataN.category_id) {
      this.idToName('category_id', dataDialog[3], dataN)
    }

    const name_concat = `${this.nameConcat.brand_id} ${this.nameConcat.category_id}`;
    ////////

    let image: any;
    if (dataDialog[1]) {
      image = dataDialog[1][0]
    } else {
      image = "";
    }


    const data = new FormData;
    data.append('name', dataDialog[0].name)
    data.append('price', dataDialog[0].price)
    data.append('name_concat', name_concat)
    data.append('price_mayorista', dataDialog[0].price_mayorista)
    data.append('discount', dataDialog[0].discount)
    data.append('picture', image)
    data.append('description', dataDialog[0].description)
    data.append('stock', dataDialog[0].stock)
    data.append('brand_id', dataDialog[0].brand_id)
    data.append('category_id', dataDialog[0].category_id)

    console.log(data);

    this._productService.addProducto(data).subscribe(
      res => {
        console.log(res);
        this._productService.openSnackBar('success', `Producto ${res.name} creado con éxito!!`)
        this.getProduct()
        this.mostrar = false;
        this.imageSrc = null

      },
      err => {
        console.log(err);

        this._productService.openSnackBar('error', `${err}`)
      },
    )
  }

  deleteReg(id: number) {
    this._productService.deleteProducto(id).subscribe(
      res => {
        this._productService.openSnackBar('success', `Producto "${res.name}" eliminado con éxito!!`)
        this.getProduct()
        this.formAdd.reset();
        this.mostrar = false;
      },
      err => {
        this._productService.openSnackBar('success', err)

      }
    )
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }




  update(dataDialog:any) {
    const id = dataDialog[0].id
    ////FORMAMOS NAME_CONCAT pasando de id a sus nombres
    const dataN = dataDialog[0];
    if (dataN.brand_id) {
      this.idToName('brand_id', dataDialog[2], dataN)
    }
    if (dataN.category_id) {
      this.idToName('category_id', dataDialog[3], dataN)
    }

    const name_concat = `${this.nameConcat.brand_id} ${this.nameConcat.category_id}`;
    ////////
    let image: any;
    if (dataDialog[1]) {
      image = dataDialog[1][0]
    } else {
      image = "";
    }


    const data = new FormData;
    data.append('name', dataDialog[0].name)
    data.append('price', dataDialog[0].price)
    data.append('name_concat', name_concat)
    data.append('price_mayorista', dataDialog[0].price_mayorista)
    data.append('discount', dataDialog[0].discount)
    data.append('picture', image)
    data.append('description', dataDialog[0].description)
    data.append('stock', dataDialog[0].stock)
    data.append('brand_id', dataDialog[0].brand_id)
    data.append('category_id', dataDialog[0].category_id)
    data.append('_method', 'PUT')
    // formData.append('image', this.selectedImage[0])
    // formData.append('name', data.name )
    // console.log(formData.get('name'));

    this._productService.updateProducto(id, data).subscribe(
      res => {
        console.log(res);
        this._productService.openSnackBar('success', `Producto ${res.name} Actualizado con éxito!!`)
        this.getProduct()
        this.mostrar = false;
        this.idUpdate = null;
        this.imageSrc = null
      },
      err => {
        console.log(err);

        this._productService.openSnackBar('error', `${err}`)
      },
    )
  }

  oculta(estado) {
    this.edit = false;
    this.formAdd.reset();
    this.mostrar = estado
  }




  openDialog(data?): void {
    const dialogRef = this.dialog.open(DialogFormComponent, {
      maxWidth: "100vw",
      maxHeight: "100vh",
      data: {data : data}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result){
        if(result[0].id){
  
          this.update(result)
        }else{
          this.addProduct(result)
  
        }
      }

    });
  }
}
