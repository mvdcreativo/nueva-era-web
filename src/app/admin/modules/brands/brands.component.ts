import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Brand } from './interfaces/brand';
import { BrandService } from './services/brand.service';


@Component({
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  brand: Brand [];
  displayedColumns: string[] = ['id', 'name', 'image_url', 'destacada', 'acciones' ];
  dataSource: any;
  formAdd : FormGroup
  mostrar :boolean = false;
  urlFiles= `${environment.urlFiles}`;
  selectedImage: FileList;
  idUpdate: any;
  edit: boolean;
  imageSrc: string | ArrayBuffer;
  destacada: any;
  checkedValue: boolean;

  constructor(
    private _branService : BrandService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.getBrand();
    this.createForm();
  }

  createForm(){
    this.formAdd = this.fb.group({
      name: [null, Validators.required],
    })
  }
  getBrand(){
    this._branService.getBrands().subscribe(
      (res:any) => {
        this.brand = res;
        
        this.brand.sort((a, b) => {
                  return (b.id - a.id)
                })

        this.dataSource = new MatTableDataSource(this.brand);
        this.dataSource.paginator = this.paginator;
      }
    );
  }
  
  onSubmit(){
    this.addBrand();
  }

  addBrand(){
    const data = this.formAdd.value;
    const formData = new FormData();
    if (this.selectedImage) {
      formData.append('image_url', this.selectedImage[0])
    }

    formData.append('name', data.name )

    formData.append('destaca', this.destacada)

    console.log(this.selectedImage[0]);
    console.log(data);
    
    
    
    this._branService.addBrand(formData).subscribe(
      res => {
        console.log(res);
        this._branService.openSnackBar('success', `Tipo ${res.name} creado con éxito!!`)
        this.getBrand()
        this.formAdd.reset();
        this.mostrar = false;
        this.imageSrc=null

      },
      err => {
        console.log(err);
        
        this._branService.openSnackBar('error', `${err}`)
      },
    )
  }

  deleteReg(id:number){
    this._branService.deleteBrand(id).subscribe(
      res => {
        this._branService.openSnackBar('success', `Marca "${res.name}" eliminada con éxito!!`)
        this.getBrand()
        this.formAdd.reset();
        this.mostrar = false;
      },
      err =>{
        this._branService.openSnackBar('success', err)

      }
    )
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


    ///////EDIT
    openEdit(element: any) {
      this.mostrar = false;
      this.formAdd.reset();
      this.edit = false;
      this.edit = true;
      this.formAdd.setValue(
        {
          name: element.name,
        }
      )
      this.checkedValue = element.destaca ? true:false;


      this.idUpdate = element.id;
      this.mostrar = true;
      console.log(element);
  
    }
  
    update(id:number) {
      const data = this.formAdd.value;
      const formData = new FormData();
  
      console.log(data);
      
      formData.append('_method', 'PUT')
      if (this.selectedImage) {
        formData.append('image_url', this.selectedImage[0])
      }
      formData.append('destaca', this.destacada)

      formData.append('name', data.name )
      console.log(formData.get('name'));
      
      this._branService.updateBrand(id, formData).subscribe(
        res => {
          console.log(res);
          this._branService.openSnackBar('success', `Marca ${res.name} Actualizado con éxito!!`)
          this.getBrand()
          this.formAdd.reset();
          this.mostrar = false;
          this.idUpdate = null;
          this.imageSrc=null
        },
        err => {
          console.log(err);
  
          this._branService.openSnackBar('error', `${err}`)
        },
      )
    }  
    
    oculta(estado) {
      this.edit = false;
      this.formAdd.reset();
      this.mostrar = estado
    }


  changeImage(e){
    
    if(e.target.files && e.target.files[0]){
      const selectedFiles = <FileList>e.target.files;
      this.selectedImage = selectedFiles;

      ///preview
      const file = selectedFiles[0]
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file)


      console.log(selectedFiles);
      console.log(this.formAdd.value);

    }
    
  }

  destacar(e){
    console.log(e.checked);
    this.destacada = e.checked ? 1:0;
  }
  destacarUpdatate(e, id){
    const destacada:any = e.checked ? 1:0;
    const formData = new FormData();

    formData.append('_method', 'PUT')
    formData.append('destaca', destacada)


    this._branService.updateBrand(id, formData).subscribe(
    res => {
      console.log(res);
      this._branService.openSnackBar('success', `Marca ${res.name} Actualizado con éxito!!`)
      this.getBrand()
      this.formAdd.reset();
      this.mostrar = false;
      this.idUpdate = null;
      this.imageSrc=null
    },
    err => {
      console.log(err);

      this._branService.openSnackBar('error', `${err}`)
    }
    )
  }
}
