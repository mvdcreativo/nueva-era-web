import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OrdersService } from 'src/app/admin/modules/orders/services/orders.service';
import { Order } from 'src/app/admin/modules/orders/interfaces/order';
import { PaymentMethodsService } from 'src/app/admin/modules/admin-payment-methods/services/payment-methods.service';
import { User } from 'src/app/auth/interfaces/user';


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
  disableButton:boolean;


  payMethodsOffline: any;

  paymentMethod_id: number;

  constructor(
    private rutaActiva : ActivatedRoute,
    private orderService : OrdersService,
    private payMethodService : PaymentMethodsService
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
        
        // this.regitrarClienteCobrosya()
      }
    )
  }

  onSubmit(){
    this.orderService.crearTalon(this.order).subscribe(
      res => console.log(res)
      
    )
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


  

  regitrarClienteCobrosya(){

    this.orderService.registrarCliente(this.order).subscribe(
      res => console.log(res)
      
    )
  }

}
