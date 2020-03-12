import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OrdersService } from 'src/app/admin/modules/orders/services/orders.service';
import { Order } from 'src/app/admin/modules/orders/interfaces/order';
import { PaymentMethodsService } from 'src/app/admin/modules/admin-payment-methods/services/payment-methods.service';
import { User } from 'src/app/auth/interfaces/user';
import { AuthService } from 'src/app/auth/auth.service';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss']
})



export class PaymentMethodsComponent implements OnInit {


  orderId: number;
  order: Order;
  panelOpenState = false;
  payMethodsOnline: any;
  disableButton:boolean = false;


  payMethodsOffline: any;

  paymentMethod_id: number;
  id_medio: number;
  msgError: string;
  cuotas: any;

  constructor(
    private rutaActiva : ActivatedRoute,
    private orderService : OrdersService,
    private payMethodService : PaymentMethodsService,
    private authService: AuthService,
    private router:Router,
    public snackBar: MatSnackBar

  ) {
    
   }

  ngOnInit() {
    
    this.rutaActiva.paramMap.subscribe(
      (params:Params)=> {
        console.log(params.params.order);
        
        this.getorder(params.params.order)
        
      })
      
      this.getPaymentMethods();


  }

  selected(e){
    console.log(e.option.value);
    
    
  }
  selectCuotas(cuota){
    console.log(cuota.value);
  }

  getorder(id){
    this.orderService.getOrder(id).subscribe(
      (res:any) => {
        this.order = res
        console.log(this.order);
        
        this.regitrarClienteCobrosya()
      }
    )
  }

  onSubmit(){
    
    if(this.id_medio){
      if(this.cuotas === undefined || this.cuotas === null){
        this.cuotas = 0
      }
      this.orderService.crearTalon(this.order,this.id_medio,this.cuotas).subscribe(
        (res:any)=> {

          const nro_talon = res.nro_talon;
          // localStorage.removeItem('cartItem');

          if(res.error === 0){
            if(this.id_medio=== 1 || this.id_medio === 5 || this.id_medio === 6){

              this.router.navigate(['/pages/finaliza-pago', this.order.id, this.id_medio ])

            }else{

              this.orderService.redirectNavegadorCobro(this.order, nro_talon,this.id_medio,this.cuotas)

            }
          
          }
        }
  
        
      )
      this.msgError=null;
    }else{
      let message, status;
      message = `Seleccione un método de pago`;
      status = 'error';
      this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 5000 });
      this.msgError = "Seleccione un método de pago"
    }
  }

  getPaymentMethods(){
    this.payMethodService.getPayMethods().subscribe(
      res => {
        
        this.payMethodsOffline = res.filter(
            v => { 
              if(v.id === 1 || v.id === 5 || v.id === 6){
                return v;
              }
            }
          );
          
          
          this.payMethodsOnline = res.filter(
            v => !this.payMethodsOffline.includes(v)
          );
      }

    );
  }

setCuotas(e){
  this.cuotas = e
  console.log(this.cuotas);
  
}
setMethod(e){
 
  this.id_medio = e
  console.log(this.id_medio);
  
}
  

  regitrarClienteCobrosya(){

    this.orderService.registrarCliente(this.order).subscribe(
      res => {
        console.log(res)
        this.authService.currentUserValue;
      }

    )
  }


}
