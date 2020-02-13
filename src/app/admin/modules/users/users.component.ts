import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/interfaces/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from './services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  user: User[];
  displayedColumns: string[] = ['id', 'name','email','phone','role','acciones'];
  dataSource: any;

  formAdd: FormGroup
  mostrar: boolean = false;
  edit: boolean;
  idUpdate: number = null;
  readOnly: boolean = true;

  constructor(
    private _userService: UserService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar

  ) { }

  ngOnInit() {
    this.createForm();
    this.getUsers();
  }

  createForm() {
    this.formAdd = this.fb.group({
      name: [null, Validators.required],
      email:[null, Validators.required],
      role:[null],
      address:[null],
      city:[null],
      phone:[null],
      ci:[null],
      rut:[null],
      company:[null],
      discount:[null],

    })
    
  }

  getUsers() {
    this._userService.getUsers().subscribe(
      (res: any) => {
        this.user = res.reverse();
        // console.log(res);

        this.dataSource = new MatTableDataSource(this.user);
      }
    );
  }

  onSubmit() {
    this.addUser();
  }

  addUser() {
    const data = this.formAdd.value;
    this._userService.addUser(data).subscribe(
      res => {
        console.log(res);
        this._userService.openSnackBar('success', `Tipo ${res.name} creado con éxito!!`)
        this.getUsers()
        this.formAdd.reset();
        this.mostrar = false;
      },
      err => {
        console.log(err);

        this._userService.openSnackBar('error', `${err}`)
      },
    )
  }

  deleteReg(id: number) {
    this._userService.deleteUser(id).subscribe(
      res => {
        this._userService.openSnackBar('success', `Tipo "${res.name}" eliminado con éxito!!`)
        this.getUsers()
        this.formAdd.reset();
        this.mostrar = false;
      },
      err => {
        this._userService.openSnackBar('success', err)

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
        email:element.email,
        role: element.role,
        address: element.address,
        city: element.city,
        phone: element.phone,
        ci: element.ci,
        rut: element.rut,
        company: element.company,
        discount: element.discount,
      }
    )
    this.idUpdate = element.id;
    this.mostrar = true;
    console.log(element);

  }

  update(id:number) {
    const data = this.formAdd.value;
    
    this._userService.updateUser(id, data).subscribe(
      res => {
        console.log(res);
        this._userService.openSnackBar('success', `Tipo ${res.name} Actualizado con éxito!!`)
        this.getUsers()
        this.formAdd.reset();
        this.mostrar = false;
        this.idUpdate = null;
      },
      err => {
        console.log(err);

        this._userService.openSnackBar('error', `${err}`)
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

}
