
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  
  categories;
  product:FormGroup
  
 
  constructor(private productService:ProductService ,private route:Router,private router:ActivatedRoute) { }

  ngOnInit(): void {
     this.productService.listeCategories().subscribe({
      next:(response)=>{
        this.categories=(response)
      },
      error:(error)=>{
        console.log(error);
        return error
        
      }
     });

     
     
     this.product=new FormGroup({
      'productName':new FormControl(null,[Validators.required]),
      'category':new FormControl(null,Validators.required),
      'description':new FormControl(null,Validators.required),
      'image':new FormControl(null,Validators.required),
      'state':new FormControl(null,Validators.required)
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
    this.product.get("image").setValue(e.target.files[0]);

  }


  addProduct(){
    //  console.log(this.newProduct);
    
    this.productService.addProduct(this.product.value).subscribe({
      next:(response)=>{
        console.log(response);
        this.router.params.subscribe({
          next:(res)=>{
            console.log('yooooowtup');
            
            this.route.navigateByUrl(`user/${res['id']}`)
          },error:(err)=>{console.log(err);
          }
        })
        

        
      },
      error:(error)=>{
        console.log(error);
        
      }
    })

}
}
