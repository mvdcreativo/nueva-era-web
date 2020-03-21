import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

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
  }

}
