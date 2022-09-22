import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountServiceService } from 'src/app/services/account-service.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Output() logi=new EventEmitter()
  isAdmin
  notifications
unreaded=0
color
  constructor(private serv:AccountServiceService,private route:Router ,private adminserv:AdminService) { this.route.routeReuseStrategy.shouldReuseRoute = function() {
    return false;}; }
  ngOnInit(): void{
    
    let token =localStorage.getItem('access')
    let helper=new JwtHelperService()
    let decode=helper.decodeToken(token)
    this.serv.is_admin(decode.user_id).subscribe({
      next:(response)=>{
        this.isAdmin=response['etat']
        this.adminserv.getAllnotification().subscribe({
          next:(res)=>{
            this.notifications=Object.values(res)
            this.notifications.map((c)=>{
              if(!c.is_Readed){this.unreaded+=1;}
              this.adminserv.getUserById(c.responsible).subscribe({
                next:(res)=>{
                  console.log('respname',res['username']);
                  
                  c.respname=res['username']
                },error:(err)=>{console.log(err);
                }
              })})
              

          },error:(err)=>{console.log(err);
          }
        })
       
      },error:(error)=>{console.log(error);
      }
    })
  }
logout(){
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
this.logi.emit()
  this.route.navigateByUrl('login')

}
read_it(id){
  this.adminserv.read_notification(id).subscribe({
    next:(res)=>{
      console.log(res);
      this.route.onSameUrlNavigation='reload'
      this.route.navigateByUrl('dashboard/offer')
      
    },error:(err)=>{console.log(err);
    }
  })

}
}
