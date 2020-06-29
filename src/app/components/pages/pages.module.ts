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
import { SuccessComponent } from './pagos/success/success.component';
import { PendingComponent } from './pagos/pending/pending.component';
import { FailureComponent } from './pagos/failure/failure.component';
import { DialogCompulsivaComponent } from './checkout/dialog-compulsiva/dialog-compulsiva.component';
import { ProductsComponent } from '../shop/products/products.component';
import { ShopModule } from '../shop/shop.module';


@NgModule({
  declarations: [
    CartComponent,
    ContactComponent,
    CheckoutComponent,
    ErrorPageComponent,
    PaymentMethodsComponent,
    ListMethodsComponent,
    FinalizaPagoComponent,
    SuccessComponent,
    PendingComponent,
    FailureComponent,
    DialogCompulsivaComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    SharedModule,
    ShopModule
  ]
})
export class PagesModule { }
