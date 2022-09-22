import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountServiceService } from '../services/account-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
@Input() hide
  val=false
    constructor(private serv:AccountServiceService) { }
  ngOnChanges(changes:SimpleChanges):void {
    console.log(changes);
    if(this.hide){
    let helper = new JwtHelperService()
    let decode=helper.decodeToken(this.hide)
    this.serv.is_admin(decode.user_id).subscribe({
      next:(response)=>{
         if(response['etat']){
          this.val=true
         }else this.val=false
      },error:(error)=>{console.log(error);
      }
    })}else this.val=false
  }
    ngOnInit(): void {
      
      
  
    }

}
