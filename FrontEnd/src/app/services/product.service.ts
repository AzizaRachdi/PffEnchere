import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import jwt_decode from "jwt-decode"
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  linkCategory="http://127.0.0.1:8000/enchere/category/"
  linkProduct="http://127.0.0.1:8000/enchere/user/product/"
  linkAvailbleProduct="http://127.0.0.1:8000/enchere/products/"
  linkOffer="http://127.0.0.1:8000/enchere/offre/"
  products
  product
  categorie ;
  categories ;
  owner
  constructor(private router:Router,private http:HttpClient) { }


  listeCategories() {
    return this.http.get(this.linkCategory) ;
  }
 
  addProduct(prod){
    let token =localStorage.getItem('access')
    const helper = new JwtHelperService();
   let decodedToken = helper.decodeToken(token);
   console.log(typeof(decodedToken.user_id));
   
    

    const uploadData = new FormData();
    uploadData.append("owner",decodedToken.user_id)
    for (let i in prod) {
      if (prod[i] instanceof Blob){  //  Check if key value is file
        uploadData.append(i, prod[i], prod[i].name ? prod[i].name : "");
      }
      else
        uploadData.append(i, prod[i]);
    }
    
    
    
    if (token){
      
      
      let p =new HttpHeaders().set('Authorization','Bearer'+ ' ' +token)
      console.log(p);
      
      return this.http.post(this.linkProduct,uploadData,{'headers':p});
    }
    else return JSON.parse('not authenticated')
    
  }




  DeleteProduct( prod ){
    // delete product prod in the table products
    let token =localStorage.getItem('access')
    if (token){
      console.log(token);
      
      let p =new HttpHeaders().set('Authorization','Bearer'+ ' ' +token)
      return this.http.post(`${this.linkProduct}${prod.id}/disable/`,null,{'headers': p});
    }
    else return JSON.parse('not authenticated')

  }

updateProduct(prod,old){
  let token =localStorage.getItem('access')
  const helper = new JwtHelperService();
 let decodedToken = helper.decodeToken(token);
 
 
  console.log(old.id);
  

  const uploadData = new FormData();
  uploadData.append("id",old.id)
  uploadData.append("category",old.category)
  uploadData.append("owner",decodedToken.user_id)
  for (let i in prod) {
    if (prod[i] instanceof Blob){  //  Check if key value is file
      uploadData.append(i, prod[i], prod[i].name ? prod[i].name : "");
    }
    else
      uploadData.append(i, prod[i]);
  }
  
  if (token){
    
      console.log(uploadData);
    
    
    
    let p =new HttpHeaders().set('Authorization','Bearer'+' '+token)
    return this.http.put(`${this.linkProduct}${old.id}/`,uploadData,{'headers':p});
  }
  else return JSON.parse('not authenticated')
}




 ViewAllProduct(){
  let token =localStorage.getItem('access')
  if (token){
    let p =new HttpHeaders().set('Authorization','Bearer'+' '+ token)
   return this.http.get(`${this.linkProduct}`,{'headers':p});
  }
  else return JSON.parse('not authenticated')
 }
 ViewProduct(id){
  let token =localStorage.getItem('access')
  if (token){
    let p =new HttpHeaders().set('Authorization','Bearer'+' '+ token)
   return this.http.get(`${this.linkProduct}${id}`,{'headers':p});
  }
  else return JSON.parse('not authenticated')
        }
  availbleProduct(id){
    return this.http.get(`${this.linkAvailbleProduct}${id}`)

  }





}
