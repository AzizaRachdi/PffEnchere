import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
   tabCategory
   constructor(private serv:ProductService ,private route:Router) { }

   ngOnInit(): void {
    this.serv.listeCategories().subscribe({
      next:(response)=>{
        console.log(response);
        this.tabCategory=response
        
      },error:(error)=>{console.log(error);
      }
    })
  }
  chooseCategory(id){
this.route.navigate(['offers'],{queryParams:{category_id:id}})
  }

}
