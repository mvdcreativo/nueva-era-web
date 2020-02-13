import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultModule } from './layouts/default/default.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AuthModule } from '../auth/auth.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DefaultModule,
    AuthModule,
  ],
  providers: [

  ]
})
export class AdminModule { }
