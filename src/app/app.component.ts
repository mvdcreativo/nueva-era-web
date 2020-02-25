import { Component } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'ecommerce-sophia-new';

  constructor(
    private spinner: NgxSpinnerService, 
  ){

  }


  ngOnInit() {
    // localStorage.removeItem('cartItem')

  }

}
