import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-btn-wsp-redirect',
  templateUrl: './btn-wsp-redirect.component.html',
  styleUrls: ['./btn-wsp-redirect.component.sass']
})
export class BtnWspRedirectComponent implements OnInit {

  constructor(
    private route: Router
  ) { 
  }

  ngOnInit() {
    window.location.href = 'https://api.whatsapp.com/send?phone=598092843843';
  }

}
