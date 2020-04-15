import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OrdersService } from 'src/app/admin/modules/orders/services/orders.service';
declare let fbq:Function;


@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})
export class PendingComponent implements OnInit {

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
                currency: 'UYU',
                content_ids: '150754082143164',
                value: res.total,
                content_type: 'product_group',
              });
              //////

          }
          
        )
        }
      
    )

              // //////PIXEL
              // fbq('track', 'Purchase', {
              //   currency: 'UYU',
              //   content_ids: '150754082143164',
              //   content_type: 'product_group',
              // });
              // //////
  }

}
