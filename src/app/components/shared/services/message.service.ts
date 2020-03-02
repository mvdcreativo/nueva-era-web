import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/components/shared/snack-bar/snack-bar.component';
declare let fbq : Function;

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private _http: HttpClient,
    public _snackBar: MatSnackBar
  ) { }


  sendMessage(message){
    return this._http.post(`${environment.API}send-message-contact`,message)
    .pipe(take(1))
    .subscribe(
        (res:any) => {
            console.log(res)
            this.openSnackBar('success', "Mensaje enviado!! Gracias por comunicarte.")
            ///pixel facebook
            fbq('track', 'CompleteRegistration');

          
        }
      )
    
  }


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
