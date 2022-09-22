import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {
  users
  constructor(private adminserv:AdminService) { }
 
  ngOnInit(): void {
    this.adminserv.getAllUsers().subscribe({
      next:(response)=>{
        console.log(response);
        this.users=Object.values(response)
      },error:(error)=>{console.log(error);
      }
    })
  }
  

}
