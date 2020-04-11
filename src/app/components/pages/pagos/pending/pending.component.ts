import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
declare let fbq:Function;


@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})
export class PendingComponent implements OnInit {

  constructor(
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activatedRoute.queryParamMap.subscribe(
      (param:Params)=> console.log(param)
      
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
