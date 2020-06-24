import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
import { FinalizaPagoComponent } from './finaliza-pago/finaliza-pago.component';
import { PendingComponent } from './pagos/pending/pending.component';
import { SuccessComponent } from './pagos/success/success.component';
import { FailureComponent } from './pagos/failure/failure.component';




const routes: Routes = [
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent, canActivate:[AuthGuard]},      
      { path: 'metodos-de-pago/:order', component: PaymentMethodsComponent, canActivate:[AuthGuard]},
      { path: 'contacto', component: ContactComponent },
      { path: 'finaliza-pago/:order/:method', component: FinalizaPagoComponent },
      { path: 'pago/exitoso', component: SuccessComponent },
      { path: 'pago/pendiente', component: PendingComponent },
      { path: 'pago/error', component: FailureComponent},



];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
