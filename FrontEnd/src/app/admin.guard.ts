import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AccountServiceService } from './services/account-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild {
  constructor(private serv:AccountServiceService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
    let token=localStorage.getItem('access')
    if (token){
    let helper=new JwtHelperService()
    let decode=helper.decodeToken(token)
    this.serv.is_admin(decode.user_id).subscribe({
      next:(response)=>{ 
          if(response['etat']){
            return true;
          }else {alert("Sir be ware are you lost ?!!");return this.router.navigateByUrl("login")}
      },error:(error)=>{console.log(error)}
    });return true}else {alert("Dude try log in first get lost !!!!");return this.router.navigateByUrl('login')}
    
  
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      
      let token=localStorage.getItem('access')
      if(token){
      let helper=new JwtHelperService()
      let decode=helper.decodeToken(token)
      this.serv.is_admin(decode.user_id).subscribe({
        next:(response)=>{ 
            if(response['etat']){
              return true
            }else {alert("Sir be ware are you lost ?!!");return this.router.navigateByUrl("login")}
        },error:(error)=>{console.log(error)}
      });return true
    }else {alert("Dude try log in first get lost !!!!");return this.router.navigateByUrl('login')}
      
  }
  
  
}
