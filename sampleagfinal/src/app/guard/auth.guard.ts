import { BackendService } from './../service/backend.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginRequestModel } from '../models/requests';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  names="";
  constructor(private route: Router){

  }
  callMe(){
    
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem("token")!=null)
      {
        return true;
      }
      else
      {
        this.route.navigateByUrl('/');
        return false;
      }
  }
  
}
