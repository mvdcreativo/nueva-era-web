import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  sideBarOpen;
  config 

  constructor(
    public breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit() {


    this.responsive()
   }


  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }


  responsive(){
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.sideBarOpen = false;
        }else{
          this.sideBarOpen = true;
        }
      });
  }
}
