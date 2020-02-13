import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  // brands: string[] = ['all', 'Lenovo', 'Dell', 'Dell', 'Lg', 'Samsung'];
  brands: string[] = ['Dog Chow', 'Royal Canin', 'Equilibrio', 'Max', 'Pro Plan', 'Naturalis'];

  @Output() brandChanged = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }


  brendSelect(event) {
     
  this.brandChanged.emit(
    event.value
  );
  }

}
