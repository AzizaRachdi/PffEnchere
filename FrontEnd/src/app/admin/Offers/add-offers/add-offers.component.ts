import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-offers',
  templateUrl: './add-offers.component.html',
  styleUrls: ['./add-offers.component.css']
})
export class AddOffersComponent implements OnInit {

 
  products;
  offer:FormGroup
 
  constructor(private offerserv:AdminService,private route:Router) { }

  ngOnInit(): void {
    
     this.offerserv.getAllProducts().subscribe({
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
        alert("offer created !!")
        this.route.navigateByUrl('dashboard/offer')

      },
      error:(error)=>{
        console.log(error);
        
      }
    })
  

}
}
