import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { User } from 'src/app/auth/interfaces/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from './services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UsersDataSource } from './services/users-data-source.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {

  tipoUser = [
    {name: "Usuario", value: "USER"},
    {name: "Usuario Mayorista", value: "UMAY"},
    {name: "Administrador", value: "ADM"},
    
  ]

  
  displayedColumns: string[] = ['id', 'name','email','phone','role','acciones'];
  dataSource: UsersDataSource;///modificado para paginacion

  formAdd: FormGroup
  mostrar: boolean = false;
  edit: boolean;
  idUpdate: number = null;
  readOnly: boolean = true;
  usersConRoles: User[];
  pageSize = 20;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  totalResut: any;

  constructor(
    private _userService: UserService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute


  ) { }

  ngOnInit() {
    this.dataSource = new UsersDataSource(this._userService);////paginacion
    this.dataSource.loadUsers('', 'asc', 1, this.pageSize);
    this.totalResut = this._userService.totalResult$
    this.createForm();
    // this.getUsers();
  }

  ngAfterViewInit() {
    this.paginator.page
        .pipe(
            tap(() => this.loadUserPage())
        )
        .subscribe();
  }


  loadUserPage() {
    this.dataSource.loadUsers(
        '',
        'asc',
        this.paginator.pageIndex,
        this.paginator.pageSize
        );

    // this.totalResut = this.userService.totalResult$

  }



  createForm() {
    this.formAdd = this.fb.group({
      name: [null, Validators.required],
      email: [{value : null, disabled: true }],
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

  onSubmit() {
    this.addUser();
  }

  addUser() {
    const data = this.formAdd.value;
    this._userService.addUser(data).subscribe(
      res => {
        console.log(res);
        this._userService.openSnackBar('success', `Tipo ${res.name} creado con éxito!!`)
        // this.getUsers()
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
        // this.getUsers()
        this.formAdd.reset();
        this.mostrar = false;
        this.loadUserPage()

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
        email: [element.email],
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
        this.loadUserPage()
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




}
