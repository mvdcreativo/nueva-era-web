import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/interfaces/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() sidebarClose = new EventEmitter()
  user: User
  auth: boolean = false
  urlExportFaceboock: string = `${environment.API}products-faceboock`;

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

  clicLink(){
      this.sidebarClose.emit()
  }

}
