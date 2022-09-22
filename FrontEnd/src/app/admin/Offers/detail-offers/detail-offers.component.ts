import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-detail-offers',
  templateUrl: './detail-offers.component.html',
  styleUrls: ['./detail-offers.component.css']
})
export class DetailOffersComponent implements OnInit {

  @Input() id
  offer
    constructor(private serv:AdminService) { }
    ngOnChanges(changes:SimpleChanges):void {
      console.log(changes);
      this.serv.getOfferById(this.id).subscribe({
         next:(res)=>{
          console.log('chose one',res);
          this.offer=res
          
    }
  })
    }
  
    ngOnInit(): void {
    }
  

}
