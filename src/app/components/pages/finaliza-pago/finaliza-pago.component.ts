import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OrdersService } from 'src/app/admin/modules/orders/services/orders.service';
import { Order } from 'src/app/admin/modules/orders/interfaces/order';
declare let fbq:Function;


@Component({
  selector: 'app-finaliza-pago',
  templateUrl: './finaliza-pago.component.html',
  styleUrls: ['./finaliza-pago.component.scss']
})
export class FinalizaPagoComponent implements OnInit {
  order: Order;
  online: boolean;

  constructor(
    private rutaActiva : ActivatedRoute,
    private orderService : OrdersService,
  ) { }

  ngOnInit(): void {

    this.rutaActiva.paramMap.subscribe(
      (params:Params)=> {
        console.log(params.params.order);

        if(params && params.params.order){
          this.getorder(params.params.order)
        }

        if(params && params.params.method){
          const method = params.params.method
          if(method === 1 || method  === 5 || method  === 6 ){
            this.online = false;
          }else{
            this.online = true;
          }
        }

      })
      


      //////PIXEL
      fbq('track', 'Purchase', {
        currency: 'UYU',
        content_ids: '150754082143164',
        content_type: 'product_group',
      });
      //////
  }



  getorder(id){
    this.orderService.getOrder(id).subscribe(
      (res:any) => {
        this.order = res
        console.log(this.order);
        
      }
    )
  }
}
