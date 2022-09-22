import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-liste-product',
  templateUrl: './liste-product.component.html',
  styleUrls: ['./liste-product.component.css']
})
export class ListeProductComponent implements OnInit {

  ListProduct
  constructor(private prodserv:ProductService,private route:Router,private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.prodserv.ViewAllProduct().subscribe({
      next:(response)=>{
        console.log(response);
        this.ListProduct=Object.values(response)
        
      },
      error:(error)=>{
        alert(error)
      }
     })
    }
    addProduct(){
       this.route.navigate(['../addproduct'],{relativeTo:this.router})
    }
    addOffer(){
      this.route.navigate(['../addoffer'],{relativeTo:this.router})
    }
  update(id,owner){
   this.route.navigateByUrl(`user/${owner}/updateProduct/${id}`)
  }
  delete(prod){
    this.prodserv.DeleteProduct(prod).subscribe({
      next:(response)=>{
        console.log(response);
        alert('product disabled !!')
        this.prodserv.ViewAllProduct().subscribe({
          next:(response)=>{
            console.log(response);
            this.ListProduct=Object.values(response)
            
          },
          error:(error)=>{
            alert(error)
          }
         })
      },
      error:(error)=>{
        alert(error)
      }
    })
    
  
  }
  }
  