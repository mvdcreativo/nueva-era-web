import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OrdersService } from 'src/app/admin/modules/orders/services/orders.service';
declare let fbq:Function;


@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  constructor(
    private activatedRoute : ActivatedRoute,
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {

    
    this.activatedRoute.queryParamMap.subscribe(
      (param:Params)=>{
        console.log(param.params.external_reference)

        // param.param
        this.ordersService.getOrder(param.params.external_reference).subscribe(
          (res:any)=> {
            console.log(res)
              //////PIXEL
              fbq('track', 'Purchase', {
                content_ids : res.productos.map(v => v.id ), 
                content_name: "Compra Finalizada", 
                content_type: "product_group" , 
                contents: res.productos.map( v => { return {'id' : v.id , 'quantity': v.pivot.quantity , 'name': v.name , 'price': v.pivot.price}}), 
                currency: "UYU",
                value: res.total
              });
              //////

          }
          
        )
        }
      
    )



  }


}
