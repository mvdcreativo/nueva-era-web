import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from 'src/app/auth/auth.module';
import { ShopModule } from '../shop/shop.module';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    ShopModule,
    AuthModule

  ],
  exports:[
    MainComponent
  ]
})
export class MainModule { }
