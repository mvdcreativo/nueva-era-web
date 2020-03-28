import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  sideBarOpen;
  config 

  constructor() { }

  ngOnInit() {
    const width= window.innerWidth;
    console.log(width);
    
    if(width <= 800){
      this.sideBarOpen = false;

    }else{
      this.sideBarOpen = true;
    }
   }


  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
