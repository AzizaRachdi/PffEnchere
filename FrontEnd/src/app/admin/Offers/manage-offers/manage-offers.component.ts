import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-manage-offers',
  templateUrl: './manage-offers.component.html',
  styleUrls: ['./manage-offers.component.css']
})
export class ManageOffersComponent implements OnInit {
offers
filter
  constructor(private serv:AdminService) { }

  ngOnInit(): void {
    this.serv.getAllOffers().subscribe({
      next:(res)=>{
        this.offers=Object.values(res)
       
        console.log('offers',this.offers);
        
      },error:(err)=>{
        alert('somthing is wrong !!')
      }
    })
  }
  chooseState(state){
    console.log('state',state.value);
    
this.filter=state.value
  }

}
