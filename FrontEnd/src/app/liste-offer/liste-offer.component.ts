import { Component, Input, OnChanges,SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { OfferServiceService } from '../services/offer-service.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-liste-offer',
  templateUrl: './liste-offer.component.html',
  styleUrls: ['./liste-offer.component.css']
})
export class ListeOfferComponent implements OnChanges  {

  @Input() listefilter;
  @Input() size
  @Input() text
  @Input() type
  owner
  listeOffer
  newliste=[]
  propose=true
  opacity=1
  selectedoffer
  timer=true
  time={
    days:0,
    hours:0,
    minutes:0,
    secondes:0
  }
  detail=true
  selectedproduct

  lastTable
  Intervaltime
  

  constructor(private offerserv:OfferServiceService,private prodserv:ProductService,private route:ActivatedRoute,private router:Router) { this.router.routeReuseStrategy.shouldReuseRoute = function() {
    return false;};}


  ngOnChanges(changes: SimpleChanges): void {
    
    this.newliste=[]
   
    
    this.offerserv.get_allOffers().subscribe({
      next:(response)=>{
        
        
        this.listeOffer=Object.values(response)
        if(this.text){
          console.log('search ok');
          
          this.listeOffer.map(i=>{
            let prod
            this.prodserv.availbleProduct(i.product).subscribe({
              next:(response)=>{
                       prod=response
                       if(prod.productName.includes(this.text)){
                         let token = localStorage.getItem('access');
                         if(token){
                         const helper = new JwtHelperService();
                         let decodedToken = helper.decodeToken(token);
                         if(decodedToken.user_id==prod.owner){
                           i.owner=true
                         }else i.owner=false}
                         this.newliste.push([i,prod])
                       }
              },
              error:(error)=>{
                  alert(error)
                }
              })
            })

        }else{
        
        if(this.listefilter.size>=1){
          this.listeOffer.map(i=>{
            let prod
            this.prodserv.availbleProduct(i.product).subscribe({
              next:(response)=>{   
                       prod=response
                   if(this.listefilter.has(prod.category)){
                 
                  let token = localStorage.getItem('access');
                  if(token){
                  const helper = new JwtHelperService();
                  let decodedToken = helper.decodeToken(token);
                  if(decodedToken.user_id==prod.owner){
                    i.owner=true
                  }else i.owner=false}
                   this.newliste.push([i,prod])
                }
                },
                error:(error)=>{
                  alert(error)
                }
              })
            })
        }else this.listeOffer.map(i=>{
          let prod
          this.prodserv.availbleProduct(i.product).subscribe({
            next:(response)=>{ 
                     prod=response  
                
                let token = localStorage.getItem('access');
                if(token){
                const helper = new JwtHelperService();
                let decodedToken = helper.decodeToken(token);
                if(decodedToken.user_id==prod.owner){
                  i.owner=true
                }else i.owner=false}
                this.newliste.push([i,prod])
              },
              error:(error)=>{
                alert(error)
              }
            })
          })}
          console.log('type',this.type);
          
          if(this.type=="D"){ this.newliste.sort((a,b)=>(a[0].endDate<b[0].endDate)?-1:1)}
          else if (this.type=="A"){this.newliste.sort((a,b)=>(a[1].productName<b[1].productName)?-1:1 )}
           else this.newliste.sort((a,b)=>(a[0].id<b[0].id)?-1:1)
          console.log('liste',this.newliste);
        },
        error:(error)=>{
          alert(error)
        }
      })

  }
  
  ngOnInit(): void {}

  to_auction(offer){
    let token=localStorage.getItem('access')
    if(token){
    this.propose=false
    this.opacity=0.1
    this.selectedoffer=offer}
    else{ alert('sorry you have to be a client ');
     this.router.navigateByUrl('login')}
    
    
 
 }


 showtime(offer){
  this.timer=false
  this.selectedoffer=offer
  this.opacity=0.1
  console.log('offer',typeof(offer.endDate));
  let time=this.time
  this.Intervaltime=setInterval(function(){
    
    let end=new Date(offer.endDate).getTime()
    let now=new Date().getTime()
    let distance=end-now
    
    
   time.days = Math.floor(distance / (1000 * 60 * 60 * 24));
   console.log(time.days);
   
    time.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    time.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    time.secondes = Math.floor((distance % (1000 * 60)) / 1000);

  },1000)}

  showdetail(offer,product){
    this.detail=false
    this.opacity=0.1
    this.selectedoffer=offer
    this.selectedproduct=product
  }

  backto(tab){
    this.opacity=tab[1]
    this.propose=tab[0]
    }
    backfrom(tab){
      this.detail=tab[0]
      this.opacity=tab[1]
    }
    returnto(tab){
      clearInterval(this.Intervaltime)
      this.timer=tab[0]
      this.opacity=tab[1]
    }
    cancelsearch(){
      this.router.onSameUrlNavigation='reload'
      this.router.navigateByUrl('offers')
    }
    
}
