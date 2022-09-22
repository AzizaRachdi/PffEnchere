import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AccountServiceService } from './services/account-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {
  constructor(private serv:AccountServiceService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)  {
      if (this.serv.estConnecte()){
       let idroute= route.paramMap.get('id')
       let token=localStorage.getItem('access')
       let helper=new  JwtHelperService()
       let decode=helper.decodeToken(token)
       if (idroute==decode.user_id){
        return true
       }else {alert("can't spy on others profile");return this.router.navigateByUrl(`user/${decode.user_id}`)}
      }else{alert("your not connected Sir !!");return this.router.navigateByUrl('login')}
    
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.serv.estConnecte()){
        let idroute= childRoute.paramMap.get('id')
        let token=localStorage.getItem('access')
        let helper=new  JwtHelperService()
        let decode=helper.decodeToken(token)
        if (idroute==decode.user_id){
         return true
        }else {alert("can't spy on others profile");return this.router.navigateByUrl(`user/${decode.user_id}`)}
       }else{alert("your not connected Sir !!");return this.router.navigateByUrl('login')}
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
