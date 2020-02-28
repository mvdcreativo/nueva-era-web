import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../components/shared/shared.module';
import { UserActionsComponent } from './user-actions/user-actions.component';
// import { ModalAuthComponent } from './modal-auth/modal-auth.component';
import { AccessComponent } from './access/access.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserActionsComponent,
    // ModalAuthComponent,
    AccessComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    UserActionsComponent
  ],
  entryComponents: [
    // ModalAuthComponent
  ]
})
export class AuthModule { }