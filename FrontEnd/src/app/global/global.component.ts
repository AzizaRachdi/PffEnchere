import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from '../services/account-service.service';
import { Subscription } from 'rxjs';
import { DashboardComponent } from '../admin/dashboard/dashboard.component';
import { LoginComponent } from '../login/login.component';
import { UserComponent } from '../user/user.component';
@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.css']
})
export class GlobalComponent implements OnInit {
  tokeno
  subscription:Subscription
   constructor(private accServ:AccountServiceService) { }
 
   ngOnInit(): void {
    this.tokeno=localStorage.getItem('access')
    let serv=this.accServ
    setInterval(()=>{
      if(localStorage.getItem('refresh')){
        
        console.log('loggedin');
        let token=localStorage.getItem('refresh')
        serv.refresh({'refresh':token}).subscribe({
          next:(response)=>{
            
            localStorage.setItem('refresh',response['refresh'])
            localStorage.setItem('access',response['access'])

          },
          error:(error)=>{
            alert(error)

          }
        })
      }else console.log('not yet');
      
    }, 240000000);
  }
  subscribe(component){
    if(!(component instanceof LoginComponent || component instanceof DashboardComponent||component instanceof UserComponent)){
      return;
    }
    const child:LoginComponent|DashboardComponent|UserComponent=component
    child.logi.subscribe(()=>{this.tokeno=localStorage.getItem('access')})
  }
  unsubscribe(){
   if(this.subscription){
    this.subscription.unsubscribe()
   }
  }
  logout(token){
      this.tokeno=token
  }

}




