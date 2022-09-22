import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AccountServiceService } from 'src/app/services/account-service.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  updateuser:FormGroup
  olduser
    constructor(private accountserv:AccountServiceService,private router:Router ,private activeRoute:ActivatedRoute) { }
  
    ngOnInit(): void {
      
      
      this.accountserv.viewprofile(this.activeRoute.snapshot.params.id).subscribe({
        next:(response=>{
          console.log('response',response);
          this.olduser=response
          this.updateuser=new FormGroup({
            "first_name":new FormControl(this.olduser.first_name,Validators.required),
            "last_name":new FormControl(this.olduser.last_name,Validators.required),
            "email":new FormControl(this.olduser.email,Validators.required),
            "username":new FormControl(this.olduser.username,Validators.required),
            "phone":new FormControl(this.olduser.phone),
            "company":new FormControl(this.olduser.company)
          })
        }),error:(erro)=>{console.log(erro);
        }
      })
  
    }
    update(){
  this.accountserv.updateProfile(this.updateuser.value,this.olduser).subscribe({
    next:(response)=>{
      console.log(response);
      this.router.navigateByUrl(`user/${this.activeRoute.snapshot.params.id}`)
    },
    error:(error)=>{
      console.log(error);
      
    }
  })
       
    }
    changepassword(){
      
  
    }
}
