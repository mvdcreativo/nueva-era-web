import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";

import { NgxSpinnerModule } from "ngx-spinner";
// import { NgxImgZoomModule } from 'ngx-img-zoom';

import { AppRoutingModule } from './app-routing.module';
import { ShopModule } from './components/shop/shop.module';
import { SharedModule } from './components/shared/shared.module';
import { MainModule } from './components/main/main.module';
import { AuthModule } from './auth/auth.module';
import { indexAuthInterceptor } from './auth/helpers/index-auth.interceptor';



let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("1083279613786-9siq46f52vqctmkc26tcrq42p1g79gis.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("1138548603145030")
  }
]);
export function provideConfig() {
  return config;
}


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
    SocialLoginModule
  ],
  providers: [
    indexAuthInterceptor,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
