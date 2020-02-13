import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../users/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/auth.service';
import { User, CurrentUser } from 'src/app/auth/interfaces/user';
import { Observable } from 'rxjs/internal/Observable';
import { NgSwitch } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  formAdd: FormGroup;
  currenUser: User;
  readOnly: boolean = true;
  edit: boolean = false;
  mostrar: boolean = false;
  typeUser: any;
  checked : boolean = false
  


  constructor(
    private _authSerice: AuthService,
    private _userService: UserService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {

    this.getUser();

  }
  getUser() {
    this._authSerice.currentUser.subscribe(
      user => {
        this.currenUser = user.user
        this.createForm();
        this.getTypeUser(user.user.role)

      }
    )
  }

  createForm() {
    this.formAdd = this.fb.group({
      name: this.currenUser.name,
      email: this.currenUser.email,
      address: this.currenUser.address,
      city: this.currenUser.city,
      phone: this.currenUser.phone,
      ci: this.currenUser.ci,
      rut: this.currenUser.rut,
      company: this.currenUser.company,
      discount: this.currenUser.discount,

    })
  }



  update(id: number) {
    const data = this.formAdd.value;

    this._userService.updateUser(id, data).subscribe(
      res => {
        console.log(res);
        this._userService.openSnackBar('success', `Tipo ${res.name} Actualizado con éxito!!`)
        this.formAdd.reset();

      },
      err => {
        console.log(err);

        this._userService.openSnackBar('error', `${err}`)
      },
    )
  }

  getTypeUser(typeUser) {
    console.log();
    
    switch (typeUser) {
      case "ADM": this.typeUser = "Administrador"
        break;
      case "MAY": this.typeUser = "Mayorista"
        break;
      case "SADM": this.typeUser = "Super Administrador"
        break;

      default: this.typeUser = "Usuario"
        break;
    }

    
  }

  changeEdit(){
    
      this.edit = !this.edit
    
  }

  oculta(estado) {
    this.edit = false;
    this.formAdd.reset();
    this.mostrar = estado
  }
}