import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AccountServiceService } from '../services/account-service.service';

import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  type
  sub
  text
  listeCategory
  categoryChosen
  chosenliste=new Set()
  constructor(private prodserv:ProductService,private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.sub=this.route.queryParams.subscribe(params=>{
      this.text=params['text']
      this.categoryChosen=params['category_id']
      console.log('chosen',this.categoryChosen);
      
      if(this.categoryChosen){
        this.chosenliste.add(parseInt(this.categoryChosen))
      }
      console.log('text',this.text)
      this.prodserv.listeCategories().subscribe({
        next:(response)=>{
          this.listeCategory=Object.values(response)
          this.listeCategory.map(c=>{
            if(c.id==this.categoryChosen)
            {c.selected=true}else c.selected=false
        })
       },error:(error)=>{console.log(error);}
      })
    })
    
  }

  sortby(type){
  this.type=type.value 
  }
  





addtofilter(id){
  
  let set=this.chosenliste
  if(!this.chosenliste.has(id)){
    
    this.chosenliste=set.add(id)
    
    
  }else {
    
    this.chosenliste.delete(id)
  }
  console.log('cosen',this.chosenliste);

}
ngOnDestroy(){
  this.sub.unsubscribe()
}
}
