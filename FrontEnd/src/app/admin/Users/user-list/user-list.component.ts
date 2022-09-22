import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @Input() users
chosenuser
  constructor(private adminserv:AdminService,private route:Router) { }

  ngOnInit(): void {
  }
  disable(user){
    if(user.active){
this.adminserv.disableUser(user.id).subscribe({
next:(response)=>{
  console.log(response);
  alert(`user : ${user.id} is disabled`)
  this.route.navigate(['dashboard/user'])
  
},error:(error)=>{console.log(error);
}
})}else alert("this user is already disabled !!")
  }
  show(id){
    console.log('hello');
    
this.chosenuser=id
  }
  activate(user){
   if(user.active){alert("this user already active !!")}else {
    this.adminserv.activateUser(user.id).subscribe({
      next:(res)=>{
        console.log(res);
        alert(`user : ${user.id} is back active`)
        this.route.navigate(['dashboard/user'])

        
      }
    })}
  }

}
