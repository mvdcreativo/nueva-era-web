import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { first } from 'rxjs/operators';
import { ResetPassDielogComponent } from './reset-pass-dielog/reset-pass-dielog.component';
import { MatDialog } from '@angular/material/dialog';
import { NewPassDilogComponent } from './new-pass-dilog/new-pass-dilog.component';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss']
})
export class AccessComponent implements OnInit {

  public formLogin: FormGroup;
  public formRegister: FormGroup;
  
  public submitted = false;
  public error = '';
  public returnUrl: string;
  errorLogin = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.errorLogin = this.authService.error$

    this.authService.errorSubject.next(null)
    this.formLogin = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });

    this.formRegister = this.formBuilder.group({
      name: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      password_confirmation: [null, [Validators.required]]
    });

    this.route.queryParamMap.subscribe(
      data =>{
        this.returnUrl = data.get('returnUrl')
          if(data.get('email')&&data.get('token')){
            this.openNewPassDialog(data)
          }
        }
    );
    // reset login status
    this.reLogout();
  }
  onSubmitLogin() {
    this.submitted = true;

    this.authService.login(this.formLogin.value)
      .pipe(first())
      .subscribe(
        data => {
          // console.log(data);
          if (this.returnUrl) {
            this.router.navigate([this.returnUrl]);
          } else {
            this.router.navigate(['/']);
          }
        },
        error => {
          this.error = error;
          // this.loading = false;
        });

  }

  onSubmitRegister(){
    this.submitted = true;
    // if (this.form.invalid) {
    //   return;
    // }
    console.log(this.formRegister.value)
     this.authService.register(this.formRegister.value)
      .pipe(first())
      .subscribe(
          data => {

            if (this.returnUrl) {
              this.router.navigate([this.returnUrl]);
            } else {
              this.router.navigate(['/']);
            }
              
          },
          error => {
              this.error = error;
              // this.loading = false;
          });
       
  }

  reLogout() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.authService.logout()
    }

  }


    openResetPassDialog(data?): void {
      const dialogRef = this.dialog.open(ResetPassDielogComponent, {
        maxWidth: "500px",
        maxHeight: "100vh",
        data: {data : data}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        if(result){
          this.authService.solicitaResetPass(result)
        }
  
      });
    }
    

    openNewPassDialog(data?): void {
      const dialogRef = this.dialog.open(NewPassDilogComponent, {
        maxWidth: "500px",
        maxHeight: "100vh",
        data: {data : data}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        if(result){
          this.authService.updatePass(result)
        }
  
      });
    }

}
