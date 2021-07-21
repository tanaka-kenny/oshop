import { AuthService } from './../auth.service';
import { UserService } from './../user.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private auth: AuthService
  ) { }

  canActivate() {
  let isAdmin:any;
  this.auth.user$.subscribe(fbAuthUser => { // get firebase authenticated user
    this.userService.get(fbAuthUser?.uid).valueChanges()
    .subscribe(dbUser => { //get user from DB
      isAdmin = dbUser?.isAdmin;
      //  console.log(dbUser);
      }); 
    }); 
  //  console.log(isAdmin);
    return true; 
  }
}
