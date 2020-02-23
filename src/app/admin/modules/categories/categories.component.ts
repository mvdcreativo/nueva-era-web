import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from './services/category.service';
import { Category } from './interfaces/category';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  category: Category[];
  displayedColumns: string[] = ['id', 'name','status', 'acciones'];
  dataSource: any;

  formAdd: FormGroup
  mostrar: boolean = false;
  edit: boolean;
  idUpdate: number = null;
  status: any;


  constructor(
    private _categoryService: CategoryService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar

  ) { }

  ngOnInit() {
    this.createForm();
    this.getCategories();
  }

  createForm() {
    this.formAdd = this.fb.group({
      name: [null, Validators.required]
    })
  }

  getCategories() {
    this._categoryService.getCategory().subscribe(
      (res: any) => {
        this.category = res.reverse();
        // console.log(res);

        this.dataSource = new MatTableDataSource(this.category);
      }
    );
  }

  onSubmit() {
    this.addCategory();
  }

  addCategory() {
    const data = this.formAdd.value;
    this._categoryService.addCategory(data).subscribe(
      res => {
        console.log(res);
        this._categoryService.openSnackBar('success', `Tipo ${res.name} creado con éxito!!`)
        this.getCategories()
        this.formAdd.reset();
        this.mostrar = false;
      },
      err => {
        console.log(err);

        this._categoryService.openSnackBar('error', `${err}`)
      },
    )
  }

  deleteReg(id: number) {
    this._categoryService.deleteCategory(id).subscribe(
      res => {
        this._categoryService.openSnackBar('success', `Tipo "${res.name}" eliminado con éxito!!`)
        this.getCategories()
        this.formAdd.reset();
        this.mostrar = false;
      },
      err => {
        this._categoryService.openSnackBar('success', err)

      }
    )
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
    this.idUpdate = element.id;
    this.mostrar = true;
    console.log(element);

  }

  update(id:number) {
    const data = this.formAdd.value;
    
    this._categoryService.updateCategory(id, data).subscribe(
      res => {
        console.log(res);
        this._categoryService.openSnackBar('success', `Categoría ${res.name} Actualizado con éxito!!`)
        this.getCategories()
        this.formAdd.reset();
        this.mostrar = false;
        this.idUpdate = null;
      },
      err => {
        console.log(err);

        this._categoryService.openSnackBar('error', `${err}`)
      },
    )
  }  
  
  oculta(estado) {
    this.edit = false;
    this.formAdd.reset();
    this.mostrar = estado
  }
  //////////

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  stat(e){
    console.log(e.checked);
    
    this.status = e.checked ? "ACT":"DIS";
  }
  chequed(status){
    let checked : boolean;
    if(status==="ACT"){
      checked=true
    }else{
      checked=false
    }
    return checked
  }

  statusUpdatate(e,id){
    const status:any = e.checked ? "ACT":"DIS";
    const data = {'status':status};

   
    

    this._categoryService.updateCategory(id, data).subscribe(
      res => {
        console.log(res);
        this._categoryService.openSnackBar('success', `Categoría ${res.name} Actualizado con éxito!!`)
        this.getCategories()
        this.formAdd.reset();
        this.mostrar = false;
        this.idUpdate = null;
      },
      err => {
        console.log(err);

        this._categoryService.openSnackBar('error', `${err}`)
      },
    )
  }
}
