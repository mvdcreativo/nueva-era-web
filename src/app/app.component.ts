import { Component, HostListener } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { NavigationEnd, Router } from '@angular/router';

declare let fbq:Function;//facebook pixel


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @HostListener('window:scroll')
  checkScroll() {
      
    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    console.log('[scroll]', scrollPosition);
    

  }


  title = 'ecommerce-sophia-new';

  constructor(
    private spinner: NgxSpinnerService, 
    private router: Router ,
    
    ) { 
      //facebook pixel
      router.events.subscribe((y: NavigationEnd) => {
        if(y instanceof NavigationEnd){
          fbq('track', 'PageView');
        }
      })
      //////

  }


  ngOnInit() {
    // localStorage.removeItem('cartItem')

  }

}
