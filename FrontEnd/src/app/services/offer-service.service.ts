import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OfferServiceService {

  constructor(private http:HttpClient) { }
  linkoffers="http://127.0.0.1:8000/enchere/offre/"
  linkOffer="http://127.0.0.1:8000/enchere/user/offre/"
  products
  linkProduct="http://127.0.0.1:8000/enchere/user/product/"
  linkAuction="http://127.0.0.1:8000/enchere/user/proposition/"
  linkComment="http://127.0.0.1:8000/enchere/user/comment/"
  linkListeComment="http://127.0.0.1:8000/enchere/comments/"
  linkCommentOwner="http://127.0.0.1:8000/enchere/readuser/"
  linkNotification="http://127.0.0.1:8000/enchere/notification/"
  
    listeproduct(){
      let token =localStorage.getItem('access')
      console.log('token',token);
      
      if (token){
        let p =new HttpHeaders().set('Authorization','Bearer'+' '+ token)
        return this.http.get(this.linkProduct,{'headers':p})
      }
      else return JSON.parse('not authenticated')
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
  
 

  get_allOffers(){
   return this.http.get(this.linkoffers)
  }



  get_offerById(id){
    let p =new HttpHeaders().set('Content-Type','multipart/form-data')
   return this.http.get(`${this.linkoffers}${id}`,{'headers':p})
  }



  auction(props){
    let token =localStorage.getItem('access')
      
     if (token){
        
      let p =new HttpHeaders().set('Authorization','Bearer'+ ' ' +token)
      console.log(p);
      
      return this.http.post(this.linkAuction,props,{'headers':p})
    }
    else return JSON.parse('not authenticated')
    }



  getOwner(owner){
      return this.http.get(`${this.linkCommentOwner}${owner}`)
    }



  getComments(){
     return this.http.get(this.linkListeComment)
    }


  addComment(text){
      let token=localStorage.getItem('access')
      if(token){
        let p =new HttpHeaders().set('Authorization','Bearer'+ ' ' +token)
        return this.http.post(this.linkComment,text,{'headers':p})
      }return JSON.parse('not authenticated')
    }

    editComment(old,newComment){

   let token=localStorage.getItem('access')
      if(token){
        let p =new HttpHeaders().set('Authorization','Bearer'+ ' ' +token)
        return this.http.put(`${this.linkComment}${old.id}/`,newComment,{'headers':p})
      }return JSON.parse('not authenticated')
    }
    

    removeComment(id){
      let token=localStorage.getItem('access')
      if(token){
        let p =new HttpHeaders().set('Authorization','Bearer'+ ' ' +token)
        return this.http.post(`${this.linkComment}${id}/disable/`,null,{'headers':p})
      }return JSON.parse('not authenticated')
      
    }

    addNotification(notification){
       return this.http.post(this.linkNotification,notification)
    }
    
  }
