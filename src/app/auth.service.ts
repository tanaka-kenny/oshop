import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = this.afAuth.authState;
   }

  logIn() {
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logOut() {
    this.afAuth.signOut();
  }
}
