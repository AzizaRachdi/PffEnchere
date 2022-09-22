import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute ,Router} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProductService } from '../services/product.service'
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  categories
  updateprod:FormGroup

currentProduct
  constructor( private activatedRoute:ActivatedRoute, private router:Router ,private productService :ProductService) { }

  ngOnInit(): void {
    this.productService.ViewProduct(this.activatedRoute.snapshot.params.idp).subscribe({
      next:(response)=>{
        
        this.currentProduct =  response
        console.log(this.currentProduct);
        this.updateprod=new FormGroup({
          'productName':new FormControl(this.currentProduct.productName,[Validators.required]),
          'description':new FormControl(this.currentProduct.description,Validators.required),
          'image':new FormControl(null,Validators.required),
          'state':new FormControl(this.currentProduct.state,Validators.required)
        })
       
        
      },
      eroor:(error)=>{
        alert(error)
      }
    });
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
    this.updateprod.get("image").setValue(e.target.files[0]);

  }

  updateProduct(){
    console.log('new',this.updateprod.value);
    
    this.productService.updateProduct(this.updateprod.value,this.currentProduct).subscribe({
      next :(response)=>{
        console.log(response);
        alert('product updated')
        let token=localStorage.getItem('access')
        let helper=new JwtHelperService()
        let decode=helper.decodeToken(token)
        this.router.navigateByUrl(`ùser/${decode.user_id}/listprod`)
        
      },
      error:(error)=>{
        alert(error)
      }
    })
    
  }

}
