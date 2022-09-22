import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { OfferServiceService } from '../services/offer-service.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {

  products;
  offer:FormGroup
 
  constructor(private productService:ProductService,private offerserv:OfferServiceService,private route:Router) { }

  ngOnInit(): void {
    
     this.offerserv.listeproduct().subscribe({
      next:(response)=>{
        console.log('response',response);
        
        this.products=(response)
        
      },
      error:(error)=>{
        console.log(error);
        return error
        
      }
     });
    
     this.offer=new FormGroup({
      "product":new FormControl(null,Validators.required),
      "price":new FormControl(null,Validators.required)
    })

     
     
     
  }

  

  

  addOffer(){
    //  console.log(this.newProduct);
    console.log(this.offer.get('product').value);
    this.offer.get('product').setValue(parseInt(this.offer.get('product').value))
    
    
    this.offerserv.addOffer(this.offer.value).subscribe({
      next:(response)=>{
        console.log(response);
        let token=localStorage.getItem('access')
        let helper=new JwtHelperService()
        let decode=helper.decodeToken(token)
        let date=new Date()
        this.offerserv.getOwner(decode.user_id).subscribe({
          next:(res)=>{
            let person=res['username']
            let notification={
               subject:` create an offer `,
               responsible:decode.user_id,
               to_who:3
              }
            this.offerserv.addNotification(notification).subscribe({
              next:(res)=>{
                 console.log(res);
                 alert("offer created !!")
                 this.route.navigateByUrl('home')
              },error:(err)=>{console.log(err);
              }
            })
           
          },error:(err)=>{console.log(err);
          }
        })
        

      },
      error:(error)=>{
        console.log(error);
        
      }
    })
  

}
close(){
  let token=localStorage.getItem('access')
        let helper=new JwtHelperService()
        let decode=helper.decodeToken(token)
  this.route.navigateByUrl(`user/${decode.user_id}/listprod`)
}
}
