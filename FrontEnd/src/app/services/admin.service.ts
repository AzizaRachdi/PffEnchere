import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
  linkcategory="http://127.0.0.1:8000/enchere/admin/category/"
  linkuser="http://127.0.0.1:8000/enchere/admin/user/"
  linkOffer="http://127.0.0.1:8000/enchere/admin/offre/"
       linkProduct="http://127.0.0.1:8000/enchere/admin/product/"
  linkNotification="http://127.0.0.1:8000/enchere/admin/notification/"

 getAllProducts(){
  let token =localStorage.getItem('access')
  console.log('heelo token');
  
  if(token){
    console.log("hello again");
    
    let p = new HttpHeaders().set('Authorization','Bearer'+' '+token)
  return this.http.get(this.linkProduct,{'headers': p})
}else return JSON.parse("not authenticated")
 }


  getAllOffers(){
    let token =localStorage.getItem('access')
    if(token){
      let p = new HttpHeaders().set('Authorization','Bearer'+' '+token)
    return this.http.get(this.linkOffer,{'headers':p})
  }else return JSON.parse("not authenticated")
  }
  getOfferById(id){
    let token =localStorage.getItem('access')
    if(token){
      let p = new HttpHeaders().set('Authorization','Bearer'+' '+token)
    return this.http.get(`${this.linkOffer}${id}`,{'headers':p})
  }else return JSON.parse("not authenticated")
  }
  
  addOffer(offer){
    let token =localStorage.getItem('access')
      
    if (token){
       
     let p =new HttpHeaders().set('Authorization','Bearer'+ ' ' +token)
     console.log(p);
     
     return this.http.post(this.linkOffer,offer,{'headers':p});
   }
   else return JSON.parse('not authenticated')
  }
  update(id,newoffer){
    let token =localStorage.getItem('access')
      
    if (token){
       
     let p =new HttpHeaders().set('Authorization','Bearer'+ ' ' +token)
     console.log(p);
     
     return this.http.put(`${this.linkOffer}${id}/`,newoffer,{'headers':p});
   }
   else return JSON.parse('not authenticated')

  }
  disableOffer(id){
    let token =localStorage.getItem('access')
      
    if (token){
       
     let p =new HttpHeaders().set('Authorization','Bearer'+ ' ' +token)
     console.log(p);
     
     return this.http.post(`${this.linkOffer}${id}/disable/`,null,{'headers':p});
   }
   else return JSON.parse('not authenticated')

  }
  
  activeOffer(id){
    let token =localStorage.getItem('access')
      
    if (token){
       
     let p =new HttpHeaders().set('Authorization','Bearer'+ ' ' +token)
     console.log(p);
     
     return this.http.post(`${this.linkOffer}${id}/active/`,null,{'headers':p});
   }
   else return JSON.parse('not authenticated')
  }

  addCategory(category){
    const uploadData = new FormData(); // Create Form Data object to upload the file in POST FORM
  
      for (let i in category) {
        
      
        if (category[i] instanceof Blob){  //  Check if key value is file
          uploadData.append(i, category[i], category[i].name ? category[i].name : "");
        }
        else
          uploadData.append(i, category[i]);
      }
    let token =localStorage.getItem('access')
   if(token){
    let p= new HttpHeaders().set('Authorization','Bearer'+' '+token)
    return this.http.post(this.linkcategory,uploadData,{'headers':p})
   }else return JSON.parse('not authenticated')
   
  }
  getAllUsers(){
    let token =localStorage.getItem('access')
    if(token){
      let p = new HttpHeaders().set('Authorization','Bearer'+' '+token)
    return this.http.get(this.linkuser,{'headers':p})
  }else return JSON.parse("not authenticated")
}
getUserById(id){
  let token =localStorage.getItem('access')
    if(token){
      let p = new HttpHeaders().set('Authorization','Bearer'+' '+token)
    return this.http.get(`${this.linkuser}${id}`,{'headers':p})
  }else return JSON.parse("not authenticated")
}
addUser(form,settings={toast:true,hideLoader:false}){
    let bool=true
  const uploadData = new FormData(); // Create Form Data object to upload the file in POST FORM
 
  for (let i in form) {
    if (form[i] instanceof Blob){  //  Check if key value is file
      uploadData.append(i, form[i], form[i].name ? form[i].name : "");
    }
    else
      uploadData.append(i, form[i]);
  }
  
 let token = localStorage.getItem('access');
 if (token) {
   let p = new HttpHeaders().set('Authorization','Bearer'+' '+token);
   return this.http.post(this.linkuser, uploadData, { headers: p })
  }
  return JSON.parse("not Authenticated !!")
}
updateUser(old,newuser){
  const uploadData = new FormData(); // Create Form Data object to upload the file in POST FORM
  
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
   return this.http.patch(`${this.linkuser}${old.id}/`, uploadData, { headers: p })
  }
  return JSON.parse("not Authenticated !!")
}

disableUser(id){
  let token =localStorage.getItem('access')
  if(token){
     let p=new HttpHeaders().set('Authorization','Bearer'+' '+token)
     return this.http.post(`${this.linkuser}${id}/disable/`,null,{'headers':p})
  }else return JSON.parse('not authenticated')
  
}
activateUser(id){
  let token =localStorage.getItem('access')
  if(token){
     let p=new HttpHeaders().set('Authorization','Bearer'+' '+token)
     return this.http.post(`${this.linkuser}${id}/activate/`,null,{'headers':p})
  }else return JSON.parse('not authenticated')
}

getAllnotification(){
  let token=localStorage.getItem('access')
  if(token){
    let p =new HttpHeaders().set('Authorization','Bearer'+' '+token)
    return this.http.get(this.linkNotification,{'headers':p})
  }
  return JSON.parse('not authenticated')
}
read_notification(id){
  let token=localStorage.getItem('access')
  if(token){
    let p =new HttpHeaders().set('Authorization','Bearer'+' '+token)
    return this.http.post(`${this.linkNotification}${id}/read/`,null,{'headers':p})
  }
  return JSON.parse('not authenticated')
}
checkoffer(id){
  let token=localStorage.getItem('access')
  if(token){
    let p=new HttpHeaders().set('Authorization','Bearer'+' '+token)
    return this.http.post(`${this.linkOffer}${id}/finalcheck/`,null,{'headers':p})
}else return JSON.parse('not autenticated')
}
 getAllCategory(){
   let token=localStorage.getItem('access')
   if(token){
   let p=new HttpHeaders().set('Authorization','Bearer'+' '+token)
   return this.http.get(this.linkcategory,{'headers':p})
  }else return JSON.parse('not authenticated')

   

 }
}
