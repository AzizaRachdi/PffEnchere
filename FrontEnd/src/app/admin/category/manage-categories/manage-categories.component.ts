import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent implements OnInit {
  listCateg
  constructor(private serv:AdminService) { }

  ngOnInit(): void {
   this.serv.getAllCategory().subscribe({
    next:(res)=>{
      this.listCateg=Object.values(res)
    },error:((err)=>{console.log(err);
    })
   })

  }

}
