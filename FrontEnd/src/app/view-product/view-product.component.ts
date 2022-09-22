
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { OfferServiceService } from '../services/offer-service.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnChanges{

  @Input() product;
  @Input() offer;
  
  @Output() returnit=new EventEmitter();
    a=true
    op=1
    listeComment
    owner
    tab=[]
    editState=true
    showcomments=false
    
    constructor(private serv:OfferServiceService,private route:Router) {this.route.routeReuseStrategy.shouldReuseRoute = function() {
      return false;}; }
    ngOnChanges(changes:SimpleChanges):void{
      this.tab=[]
      console.log('changes',changes);
      console.log('product',this.product.owner);
      console.log('offer',this.offer.id);
      
      
      this.serv.getOwner(this.product.owner).subscribe({
        next:(response)=>{
          console.log('owner',response);
           this.owner=response
           this.serv.getComments().subscribe({
            next:(response)=>{
                  console.log(response);
                  console.log('liste',response);
              
                  this.listeComment=Object.values(response)
                  console.log('beforefilter',(this.listeComment));
                  function checkoffer(id,offer) {
                    return id == offer.id;
                  }
                   
                  var finaltab= this.listeComment.filter(c=> checkoffer(c.offer,this.offer))
                  // this.listeComment.filter( c =>(c.offre==this.offer.id))
                  console.log('afterfilter',finaltab);
                  
                  for (let i in this.listeComment){
                    console.log('owneroo',finaltab[i].owner);
                
                    this.serv.getOwner(finaltab[i].owner).subscribe({
                     next:(response)=>{
                                    console.log(`${i}`,response);
                    
                                    let token=localStorage.getItem('access')
                                    let helper =new JwtHelperService()
                                    let decode=helper.decodeToken(token)
                                    let state=(decode.user_id==finaltab[i].owner)
                                    this.tab.push({comment:finaltab[i],user:{username:response['username'],image:response['photo'],is_owner:state}})
                    
                                  },error:(error)=>{console.log(error);
                                  }
                    })
                  }
                },error:(error)=>{console.log(error);
                }
          })
        },error:(error)=>{console.log(error);
        }
  
  
      })
      
      
      
    }
    ngOnInit(): void {
     
    }
  
    back(){
      this.returnit.emit([this.a,this.op])
    }
    addComment(comment){
     let token=localStorage.getItem('access')
     if(token){
     let helper=new JwtHelperService()
     let decode=helper.decodeToken(token)
     let final={offer:this.offer.id,owner:decode.user_id,comment:comment}
     this.serv.addComment(final).subscribe({
      next:(response)=>{
        console.log(response);
        this.route.onSameUrlNavigation='reload'
        this.route.navigateByUrl('offers')
        
      },error:(error)=>{console.log(error);
      }
     })}else {
      alert("you have to be a client to have such service sir !!")
      this.route.onSameUrlNavigation='reload'
        this.route.navigateByUrl('offers')
     }
     
    }
    editComment(old,newComment){
      this.serv.editComment(old,{owner:old.owner,offer:old.offer,comment:newComment}).subscribe({
        next:(response)=>{console.log(response);
                          this.editState=true
                          window.location.reload()
        },error:(error)=>{console.log(error);
        }
      })
    }
    showEdit(){
      this.editState=false
    }
    removeComment(id){
  this.serv.removeComment(id).subscribe({
    next:(response)=>{
      console.log(response);
      window.location.reload()
      
    },error:(error)=>{console.log(error);
    }
  })
    }
  
    showComments(){
      this.showcomments=!this.showcomments
    }
  
  }
  