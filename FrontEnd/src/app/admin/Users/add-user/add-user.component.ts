import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user:FormGroup;
  typeStatus=['MALE','FEMALE']
  constructor(private serv:AdminService,private route:Router) { }

  ngOnInit(): void {
    this.user=new FormGroup({
      'first_name':new FormControl(null,[Validators.required]),
      'last_name':new FormControl(null,[Validators.required]),
      'age':new FormControl(null,[Validators.required]),
      'email':new FormControl(null,[Validators.email,Validators.required]),
      'username':new FormControl(null,[Validators.required]),
      'password':new FormControl(null,[Validators.required]),
      'phone':new FormControl(null),
      'photo':new FormControl(""),
      'genre':new FormControl(null,[Validators.required]),
      'companie':new FormControl(null),
      'active':new FormControl(null)
    })
  }
  getFile(e) {

    let extensionAllowed = {"png":true,"jpeg":true,"jpg":true};
    console.log(e.target.files);
    if (e.target.files[0].size / 1024 / 1024 > 10) {
      alert("File size should be less than 10MB")
      return;
    }
    if (extensionAllowed) {
      var nam = e.target.files[0].name.split('.').pop();
      if (!extensionAllowed[nam]) {
        alert("Please upload " + Object.keys(extensionAllowed) + " file.")
        return;
      }
    }
    this.user.get("photo").setValue(e.target.files[0]);

  }


   onSubmit(){
    console.log('photo',this.user.get('photo').value);
    
   }
  }