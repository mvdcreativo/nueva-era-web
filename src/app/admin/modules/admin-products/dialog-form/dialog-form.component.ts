import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Product } from 'src/app/modals/product.model';
import { environment } from 'src/environments/environment';
import { ProductAdminService } from '../services/product-admin.service';

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss']
})
export class DialogFormComponent implements OnInit {
  

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



  constructor(
    public dialogRef: MatDialogRef<DialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _productService: ProductAdminService,
    ) {}


  ngOnInit(): void {
    this.selectBrand()
    this.createForm();
    console.log(this.data);
    
    if(this.data.data !== undefined){
      this.openEdit(this.data.data)
      console.log(this.data);
      
    }

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
    // var discount
    // if(element.discount === null){
    //   discount = 0;
    // }else{
    //   discount = element.discount;
    // }
    // var price_mayorista
    // if(element.price_mayorista === null){
    //   price_mayorista = 0;
    // }else{
    //   price_mayorista = element.discount;
    // }

    this.formAdd.patchValue(
      {
        id: element.id,
        name: element?.name,
        price: element?.price,
        name_concat:element?.name_concat,
        price_mayorista: element?.price_mayorista,
        discount: element?.discount,
        description: element?.description,
        stock: element?.stock,
        brand_id: element?.brand_id,
        category_id: element?.category_id
      }
      )
      this.imageSrc = `${this.urlFiles+element.picture}`


    this.idUpdate = element.id;
   
    console.log(element);

  }


  changeImage(e){
    const reader = new FileReader();
    
    if(e.target.files && e.target.files[0]){
      const selectedFiles = <FileList>e.target.files;

      reader.readAsDataURL(selectedFiles[0])

      // formData.append('picture', this.selectedImage[0])
      // this.formAdd.patchValue({
      //   picture: image
      // })

      this.selectedImage = selectedFiles;

      ///preview
  
      reader.onload = e => {
        this.formAdd.patchValue({
          picture: reader.result
        })
        this.imageSrc = reader.result
      
      };
      


      console.log(selectedFiles);
      console.log(this.formAdd.value);
      

    }
    
  }



      /// INPUT SELECT MARCA autocomplete
      selectBrand() {
        this._productService.getBrands().subscribe(
            (res: any) => {
              this.brands = res
              
              this.selectCategory()
              console.log(res)
            }
          );
      }
      selectCategory() {
        this._productService.getCategory().subscribe(
            (res: any) => {
              this.categories = res
              
              
              console.log(res)
            }
          );
      }


      onNoClick(): void {
        this.dialogRef.close();
      }
}
