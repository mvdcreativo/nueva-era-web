import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/interfaces/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  user: User
  auth: boolean = false

  constructor(
    private _authService: AuthService
  ) {
    
    this.user = this._authService.currentUserValue.user;
    if(this.user.role === "ADM"){
      this.auth = true
    }

    


   }

  ngOnInit() {


  }

}
