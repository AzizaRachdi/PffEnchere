import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {
 
  linkregister="http://127.0.0.1:8000/enchere/register/";
  linkAdmin="http://127.0.0.1:8000/enchere/admin/user/";
  linkLogin="http://127.0.0.1:8000/login/"
  linkRefresh="http://127.0.0.1:8000/relog/"
  linkUser="http://127.0.0.1:8000/enchere/user/profile/"
  linkUsers="//127.0.0.1:8000/enchere/readuser/"
  constructor(private http : HttpClient) { }
  addAccount( form, settings = { toast: true, hideLoader: false }) {

      
    const uploadData = new FormData(); // Create Form Data object to upload the file in POST FORM
  
    for (let i in form) {
      
    
      if (form[i] instanceof Blob){  //  Check if key value is file
        uploadData.append(i, form[i], form[i].name ? form[i].name : "");
      }
      else
        uploadData.append(i, form[i]);
    }
    
    console.log('hi',uploadData);
    return this.http.post(this.linkregister, uploadData)
  }



login(form){
  return this.http.post(this.linkLogin,form)
}

refresh(reftoken){

  return this.http.post(this.linkRefresh,reftoken)
}

estConnecte() {
  let token = localStorage.getItem('access');
  if (token) return true;
  else return false;
}


updateProfile(newuser,old){
  const uploadData = new FormData(); // Create Form Data object to upload the file in POST FORM
  uploadData.append("age",old.age)
  uploadData.append("genre",old.genre)
  uploadData.append("image",old.image)

  for (let i in newuser) {
    

    if (newuser[i] instanceof Blob){  //  Check if key value is file
      uploadData.append(i, newuser[i], newuser[i].name ? newuser[i].name : "");
    }
    else
      uploadData.append(i, newuser[i]);
  }
  
 let token = localStorage.getItem('access');
 if (token) {
   let p = new HttpHeaders().set('Authorization','Bearer'+' '+token);
   return this.http.patch(`${this.linkUser}${old.id}/`, uploadData, { headers: p })
  }
  return JSON.parse("not Authenticated !!")
}

seDeconnecter() {
  localStorage.removeItem('refresh');
  localStorage.removeItem('access')
  
}

viewprofile(id){
  let token = localStorage.getItem('access');
  if (token) {
    let p = new HttpHeaders().set('Authorization','Bearer'+' '+ token);
    return this.http.get(`${this.linkUser}${id}`, { headers: p })
   }
   return JSON.parse("not Authenticated !!")
}

addsolde(user,ammount){
  let token = localStorage.getItem('access');
  if (token) {
    let solde=parseFloat(user.solde)+parseFloat(ammount)
    let p = new HttpHeaders().set('Authorization','Bearer'+' '+token);
    return this.http.patch(`${this.linkUser}${user.id}/`, {'solde':solde}, { headers: p })
   }
   return JSON.parse("not Authenticated !!")
}
removesolde(user,ammount){
  let token = localStorage.getItem('access');
  if (token) {
    let solde=parseFloat(user.solde)-parseFloat(ammount)
    let p = new HttpHeaders().set('Authorization','Bearer'+' '+token);
    return this.http.patch(`${this.linkUser}${user.id}/`, {'solde':solde}, { headers: p })
   }
   return JSON.parse("not Authenticated !!")
}
is_admin(id){
let token=localStorage.getItem('access')
if(token){
let p =new HttpHeaders().set('Authorization','Bearer'+' '+token)

return this.http.get(`${this.linkUser}${id}/is_admin/`,{'headers':p})
}return JSON.parse('not authenticate')}

is_active(){
  
  return this.http.get(this.linkUsers)

}
disactivate(id){
  let token=localStorage.getItem('access')
if(token){
let p =new HttpHeaders().set('Authorization','Bearer'+' '+token)

return this.http.post(`${this.linkUser}${id}/disable/`,null,{'headers':p})
}return JSON.parse('not authenticate')}
}

