import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountServiceService } from '../services/account-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  @Output() logi=new EventEmitter()
  
  to_remember
  users
  id
  constructor(private userserv:AccountServiceService,private router: Router,private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {
  }
  
  create_new(){
    console.log("i'll get you there soon");
    
  }

  regain_password(){
    console.log("ok i'll regain it for you");
    
  }
  remember(){
    this.to_remember=true
  }



  login(newuser){
    this.userserv.is_active().subscribe({
      next:(res)=>{
        let liste=Object.values(res)
        
        let index=liste.indexOf(liste.filter((c)=> c.username==newuser.username && c.active==true)[0])
        console.log('liste',liste);
        
        if(index!=-1){

        
        this.userserv.login(newuser).subscribe({
      next:(response)=>{
         localStorage.setItem('refresh',response['refresh'])
         localStorage.setItem('access',response['access'])
         let token =localStorage.getItem('access')
         const helper = new JwtHelperService();
        let decodedToken = helper.decodeToken(token);
        this.userserv.is_admin(decodedToken.user_id).subscribe({
          next:(response)=>{
            console.log(response);
            if(response['etat']){
              this.logi.emit()
              this.router.navigateByUrl('dashboard/main')
              
            }else{this.logi.emit(); this.router.navigateByUrl(`user/${decodedToken.user_id}`)}
            

          },error:(error)=>{console.log(error);
          }
        })
         
        // this.router.navigateByUrl('home')
         
      },
      error:(error)=>{
          alert(Object.values(error))
      }
    })}else alert("this account is not availble anymore")
      },error:(err)=>{
        console.log(err);
      }
    })
    
    
    
  }
  

  
}
