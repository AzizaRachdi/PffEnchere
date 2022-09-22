import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-liste-offers',
  templateUrl: './liste-offers.component.html',
  styleUrls: ['./liste-offers.component.css']
})
export class ListeOffersComponent implements OnInit {

  @Input() offers
  @Input() filter
  listeoffers
  chosenoffer
  hide=false
    constructor(private adminserv:AdminService,private route:Router,private http:HttpClient) { this.route.routeReuseStrategy.shouldReuseRoute = function() {
      return false;}; }
  
      ngOnChanges(changes:SimpleChanges):void{
        console.log('table',this.offers);
        console.log('filter',this.filter);
        
        
         if(this.filter!=null){
          console.log('hi');
          
          this. listeoffers=this.offers.filter(c=>c.etat==this.filter)
          if (this.listeoffers.length<1){
            this.hide=true
          }else this.hide=false
         }else  this.listeoffers=this.offers
  
         console.log('last',this.listeoffers);
         
      }
      ngOnInit(): void {
      }
      
      disable(offer){
        if(offer.etat=='PENDING'||offer.etat=='ACTIVE'||offer.etat=='APPROVED'){
         this.adminserv.disableOffer(offer.id).subscribe({
         next:(response)=>{
           console.log(response);
           alert(`offer : ${offer.id} is disabled`)
           this.route.onSameUrlNavigation='reload'
           this.route.navigateByUrl('dashboard/offer')
      
    },error:(error)=>{console.log(error);}
    })
    }else alert("this offer is already disabled !!")
      }
      show(id){
        this.chosenoffer=id
      }
      activate(offer){
       if(offer.etat=='ACTIVE'||offer.etat=='APPROVED'){alert("this offer already active !!")}else {
        this.adminserv.activeOffer(offer.id).subscribe({
          next:(res)=>{
            console.log(res);
            alert(`offer : ${offer.id} is back active`)
           this.route.onSameUrlNavigation='reload'
            this.route.navigateByUrl('dashboard/offer')
    
            
          }
        })}
      }
      check(offer){
        
        
        if(offer.checked==false){
         if(offer.etat=='ACTIVE'||offer.etat=='DISABLED'||offer.etat=='PENDING'){
           alert("you can't do that !!" )
           }
          else {this.adminserv.checkoffer(offer.id).subscribe({
            next:(res)=>{alert(res);this.route.onSameUrlNavigation='reload';this.route.navigate(['dashboard/offer'])
            },error:(err)=>{console.log(err);
            }
          }); }
        }else alert ('your are  not able')
       
      }
      
      
  }
  