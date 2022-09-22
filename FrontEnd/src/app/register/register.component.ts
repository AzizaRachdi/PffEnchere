import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountServiceService } from '../services/account-service.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  account:FormGroup;
  condition=false;
  confirmPasswod;
  is_confirm;
  typeStatus=['MALE','FEMALE']
  constructor(private accountServ:AccountServiceService,private route :Router) { }

  ngOnInit(): void {
    this.account=new FormGroup({
      'first_name':new FormControl(null,[Validators.required]),
      'last_name':new FormControl(null,[Validators.required]),
      'age':new FormControl(null,[Validators.required]),
      'email':new FormControl(null,[Validators.email,Validators.required]),
      'username':new FormControl(null,[Validators.required]),
      'password':new FormControl(null,[Validators.required]),
      'phone':new FormControl(null),
      'photo':new FormControl(""),
      'genre':new FormControl(null,[Validators.required]),
      'companie':new FormControl(null)
    })
  }

  setconf(pass){
    this.confirmPasswod=pass
  }
  toggleEditable(event) {
    if ( event.target.checked ) {
        this.condition = true;
   }
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
    this.account.get("photo").setValue(e.target.files[0]);

  }


   onSubmit(){
    console.log('photo',this.account.get('photo').value);
    
    if (this.confirmPasswod == this.account.get("password").value){
       this.is_confirm= true
       if (this.condition){
         this .accountServ.addAccount(this.account.value).subscribe({
          next:(response)=>{
            console.log('response',response);
            alert('Account Created !!')
            this.route.navigateByUrl("/login")
          },
          error:(error)=>{
            console.log("this is ",error);
            
          }
          
         });
         return

       }
       else console.log('not condition');return
       
    }
    else 
    console.log('pass',this.account.get('password').value);
    console.log('passconf',this.confirmPasswod);
    console.log('not confirm');
    

   }
}
