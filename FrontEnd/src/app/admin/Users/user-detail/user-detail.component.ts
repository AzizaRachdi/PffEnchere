import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input() id
user
  constructor(private serv:AdminService) { }
  ngOnChanges(changes:SimpleChanges):void {
    console.log(changes);
    this.serv.getUserById(this.id).subscribe({
       next:(res)=>{
        console.log('chose one',res);
        this.user=res
  }
})
  }

  ngOnInit(): void {
  }

}
