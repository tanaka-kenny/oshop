import { AuthService } from './../auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent  {

  constructor(public auth: AuthService) { 
  }

  logOut() {
    this.auth.logOut();
  }

}
