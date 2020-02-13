import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
// import { NgxImgZoomModule } from 'ngx-img-zoom';

import { AppRoutingModule } from './app-routing.module';
import { ShopModule } from './components/shop/shop.module';
import { SharedModule } from './components/shared/shared.module';
import { MainModule } from './components/main/main.module';
import { AuthModule } from './auth/auth.module';
import { indexAuthInterceptor } from './auth/helpers/index-auth.interceptor';



@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    NgxSpinnerModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    ShopModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    // NgxImgZoomModule,
    MainModule,
    AuthModule,
    
  ],
  providers: [
    indexAuthInterceptor,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
