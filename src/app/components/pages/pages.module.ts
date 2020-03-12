import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeFourComponent } from '../shop/home-four/home-four.component';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
import { ListMethodsComponent } from './payment-methods/list-methods/list-methods.component';
import { FinalizaPagoComponent } from './finaliza-pago/finaliza-pago.component';


@NgModule({
  declarations: [
    CartComponent,
    ContactComponent,
    CheckoutComponent,
    ErrorPageComponent,
    PaymentMethodsComponent,
    ListMethodsComponent,
    FinalizaPagoComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    SharedModule,
  ]
})
export class PagesModule { }
