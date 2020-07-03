import { Component, HostListener } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { NavigationEnd, Router } from '@angular/router';

declare let fbq:Function;//facebook pixel
declare let gtag:Function;//facebook pixel

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {



  constructor(
    private spinner: NgxSpinnerService, 
    private router: Router ,
    
    ) { 
      //facebook pixel
      router.events.subscribe((y: NavigationEnd) => {
        if(y instanceof NavigationEnd){
          fbq('track', 'PageView');

          gtag('config', 'G-8VTYKQ2XSH', {
            'page_path' : y.urlAfterRedirects
          })
        }
      })
      //////

  }


  ngOnInit() {
    // localStorage.removeItem('cartItem')

  }



}
