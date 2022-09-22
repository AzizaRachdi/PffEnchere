import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountServiceService } from '../services/account-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Output() logi=new EventEmitter()
  id
  profile=true
  setting=false
  password=false
  conf=true
  old
  deposit=true
  withdraw=true
  opacity=1
  
    constructor(private userserv:AccountServiceService,private activeRoute:ActivatedRoute,private route:Router) { }
  
    ngOnInit(): void {
    
      this.id=this.activeRoute.snapshot.params.id
      this.userserv.viewprofile(this.id).subscribe({
       next:(response)=>{
         console.log('user',response);
         this.old=response  
       },
       error:(error)=>{
         alert(error)
       }
      })

}
changep(){
this.profile=true
this.setting=false
this.password=false

}
changes(){
this.profile=false
this.setting=true
this.password=false
}
changepa(){
this.profile=false
this.setting=false
this.password=true
}

activeprofile(){

 return{'show':this.profile,
 'active':this.profile}
 
}
activesetting(){
 
 return{'show':this.setting,
 'active':this.setting}
 
} activepassword(){
 
 return{'show':this.password,
 'active':this.password}
 
}
changepassword(f){
 console.log(this.old);
 
 if (f.password==this.old.password){
 if (f.renewpassword ==f.newpassword){
   this.userserv.updateProfile({"password":f.newpassword},this.old).subscribe({
     next:(response)=>{console.log('response',response);
                       this.route.navigateByUrl(`user/${this.id}`)
     },error:(error)=>{alert(error)}
   })
 }

}
}
opendeposit(){
this.deposit=false
this.opacity=0.1
}
openwithdraw(){
this.withdraw=false
this.opacity=0.1
}
addsold(price){
this.userserv.addsolde(this.old,price).subscribe({
 next:(response)=>{
   console.log(response);
   alert('operation succeded')
   window.location.reload()
   
 },error:(error)=>{
   console.log(error);
   
 }
})
}
witdraw(price){
if (parseFloat(this.old.solde)>parseFloat(price)){
this.userserv.removesolde(this.old,price).subscribe({
next:(response)=>{
 console.log(response);
 alert('operation succeded')
 window.location.reload()
 
},error:(error)=>{
 console.log(error);
 
}
})
}else {alert("not enough Gold"); window.location.reload()}}
close1(){
this.deposit=true
this.opacity=1
}
close2(){
this.withdraw=true
this.opacity=1
}
disactivateAccount(id){
this.userserv.disactivate(id).subscribe({
 next:(res)=>{
   alert(Object.values(res))
   this.userserv.seDeconnecter()
   this.logi.emit()
   this.route.navigateByUrl('')
 }
})
}
}