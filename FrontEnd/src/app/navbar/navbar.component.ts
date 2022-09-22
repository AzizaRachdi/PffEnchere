import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountServiceService } from '../services/account-service.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit ,OnChanges {




  @Input() token
  user
  profile_picture="../../assets/images/profile_new.png"
  username="anonyme"
  solde=0
  isUserAuthenticated ;
  admin=false
  searchItem=""
  @Output() outi=new EventEmitter()
  
  constructor(private accountservice :AccountServiceService,private route:Router,private router:ActivatedRoute) { this.route.routeReuseStrategy.shouldReuseRoute = function() {
    return false;}; }

  ngOnChanges(changes:SimpleChanges):void{
    this.isUserAuthenticated=this.accountservice.estConnecte()
    
    if(this.token){
      
    let helper=new JwtHelperService()
    let decode=helper.decodeToken(this.token)
    this.accountservice.viewprofile(decode.user_id).subscribe({
      next:(res)=>{
           
           this.user=res
           console.log('user',this.user);
           this.profile_picture=res['photo']
           this.username=res['username']
           this.solde=res['solde']

           this.accountservice.is_admin(decode.user_id).subscribe({
              next:(response)=>{
                 this.admin=response['etat']
                 
        

              },error:(error)=>{console.log(error);}
           })
      },error:(err)=>{console.log(err);}
    })
   }else this.admin=false
  }
  

  ngOnInit( ): void {
  





  }




onLogout(){
  this.accountservice.seDeconnecter();
  this.isUserAuthenticated=this.accountservice.estConnecte()
  console.log('hello',localStorage.getItem("access"));
 this.outi.emit(localStorage.getItem("access"))
  this.route.navigateByUrl('')
 
}
search(text){
    console.log('searchis',text);
    this.route.onSameUrlNavigation='reload'
    this.route.navigate(['offers'],{queryParams:{text:text}})
   // window.location.assign(`home?text=${text}`)
  
  
}
gotologin(){
 return this.route.navigateByUrl('login')
}
gotoregister(){
return this.route.navigateByUrl('register')
}
gotoprofile(id){
  return this.route.navigateByUrl(`user/${id}`)
}

}