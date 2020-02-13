import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';
import { User } from 'src/app/auth/interfaces/user';
import { SnackBarComponent } from 'src/app/components/shared/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _http: HttpClient,
    private _snackBar: MatSnackBar
  ) { }


// //categoias
getUsers() {
  return this._http.get<User[]>(`${environment.AuthAPI}users`).pipe(
    take(1)
  )
}
addUser(data) {
  return this._http.post<User>(`${environment.AuthAPI}users`, data).pipe(
    take(1)
  )
}

deleteUser(id) {
  return this._http.delete<User>(`${environment.AuthAPI}users/${id}`).pipe(
    take(1)
  )
}

updateUser(id, data){
  return this._http.put<User>(`${environment.AuthAPI}users/${id}`, data).pipe(
    take(1)
  )
}



////////////////////
openSnackBar(estadoRes, message: string) {
  let classToast: string;
  switch (estadoRes) {
    case "success":
      classToast = "toastSuccess"
      break;
    case "warn":
      classToast = "toastWarn"
      break;
    case "error":
      classToast = "toastError"
      break;

    default:
      classToast = "toastError"
      break;
  }

  const durationSeconds = 5;
  this._snackBar.openFromComponent(SnackBarComponent, {
    data: message,
    panelClass: [classToast],
    verticalPosition: 'top',
    duration: durationSeconds * 1000,
  });
}
}
