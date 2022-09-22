import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { OfferServiceService } from '../services/offer-service.service';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.css']
})
export class ProposalComponent implements OnInit {

  @Input() offer;

  @Output() returnit=new EventEmitter();
    a=true
    op=1
   
    constructor(private auctionserv:OfferServiceService,private router:Router) { }
  
    ngOnInit(): void { 
    console.log('offer',this.offer);
    
    
    }
  to_auction(old,newprice){
    let token =localStorage.getItem('access')
    const helper = new JwtHelperService();
   let decodedToken = helper.decodeToken(token);
   
    if (old<newprice){
      
        this.auctionserv.auction({"price":newprice,"client":decodedToken.user_id,"offre":this.offer.id}).subscribe({
          next:(response)=>{
          console.log('propositions',this.offer);
          
            console.log(response);
            
            alert("operation succeded")
            window.location.reload()
            
          },
          error:(error)=>{
            alert(error)
          }
        })
  
    }
    else alert("operation failed")
  
  }
  
  close(){
    this.returnit.emit([this.a,this.op])
  }
  }
  