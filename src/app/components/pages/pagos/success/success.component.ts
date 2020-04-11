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
        console.log(param.params)
        // param.param
        // this.ordersService.updateOrder(param.param.)
        }
      
    )


          //////PIXEL
          fbq('track', 'Purchase', {
            currency: 'UYU',
            content_ids: '150754082143164',
            content_type: 'product_group',
          });
          //////
  }

}
