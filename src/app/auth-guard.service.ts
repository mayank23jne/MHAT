import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  authState = new BehaviorSubject(false);
  constructor(private router: Router,
    private storage: Storage,
    private platform: Platform,
    public toastController: ToastController) {
      this.platform.ready().then(() => {
        this.ifLoggedIn();
      });
    }

  ifLoggedIn() {
    
      if (localStorage.getItem('email')!=null) {  
        this.authState.next(true);
      }
  }


  // login() {
  //   var dummy_response = {
  //     user_id: '007',
  //     user_name: 'test'
  //   };
  //   this.storage.set('USER_INFO', dummy_response).then((response) => {
  //     this.router.navigate(['dashboard']);
  //     this.authState.next(true);
  //   });
  // }

  logout() {
      localStorage.clear();
      this.router.navigate(['sign-in']);
      this.authState.next(false);
   
  }

  isAuthenticated() {
    return this.authState.value;
  }
  canActivate(): boolean {
    return this.isAuthenticated();
  }
}
