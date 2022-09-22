import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  category:FormGroup
  constructor(private service:AdminService,private route:Router) { }

  ngOnInit(): void {
    this.category=new FormGroup({
      
      'categoryName':new FormControl(null,Validators.required),
      'duration':new FormControl(null,Validators.required),
      'image':new FormControl(null,Validators.required),
      
     })
  }
  getFile(e) {

    let extensionAllowed = {"png":true,"jpeg":true,"jpg":true};
    console.log(e.target.files);
    if (e.target.files[0].size / 1024 / 1024 > 10) {
      alert("File size should be less than 10MB")
      return;
    }
    if (extensionAllowed) {
      var nam = e.target.files[0].name.split('.').pop();
      if (!extensionAllowed[nam]) {
        alert("Please upload " + Object.keys(extensionAllowed) + " file.")
        return;
      }
    }
    this.category.get("image").setValue(e.target.files[0]);

  }
  addCategory(){
    //  console.log(this.newProduct);
    this.category.get('duration').setValue(parseInt(this.category.get('duration').value))
    this.service.addCategory(this.category.value).subscribe({
      next:(response)=>{
        console.log(response);
        this.route.navigateByUrl(`dashboard/category`)
        
      },
      error:(error)=>{
        console.log(error);
        
      }
    })

}

}
