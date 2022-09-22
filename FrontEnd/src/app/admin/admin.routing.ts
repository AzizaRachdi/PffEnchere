import {RouterModule, Routes } from "@angular/router";

import { UpdateUserComponent } from "../update-user/update-user.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { ManageAuctionsComponent } from "./manage-auctions/manage-auctions.component";
import { ManageCategoriesComponent } from "./category/manage-categories/manage-categories.component";
import { ManageCommentsComponent } from "./manage-comments/manage-comments.component";

import { ManageProductsComponent } from "./manage-products/manage-products.component";

import { ManageOffersComponent } from "./Offers/manage-offers/manage-offers.component";
import { UpdateOffersComponent } from "./Offers/update-offers/update-offers.component";
import { AddUserComponent } from "./Users/add-user/add-user.component";

import { ManageUserComponent } from "./Users/manage-user/manage-user.component";
import { AddCategoryComponent } from "./category/add-category/add-category.component";

import { AddOffersComponent } from "./Offers/add-offers/add-offers.component";


let admin_routes: Routes = [
    {
      path: 'dashboard',component:DashboardComponent,
  
      children: [
        
        { path: 'main', component: MainPageComponent },
        { path: 'user',children:[
          {path:'',component: ManageUserComponent },
          {path:'adduser',component:AddUserComponent},
          {path:'update/:id',component:UpdateUserComponent}
        ],
         },
         {path:'offer',children:[
          {path:'',component:ManageOffersComponent},
          {path:'addoffer',component:AddOffersComponent},
          {path:'updateoffer/:id',component:UpdateOffersComponent}
         ]},
        { path: 'product', component: ManageProductsComponent },
        { path: 'auction', component: ManageAuctionsComponent },
        { path: 'comment', component: ManageCommentsComponent },
        { path: 'category',children:[
          {path:"",component:ManageCategoriesComponent},
          {path:"addcategory",component:AddCategoryComponent}
        ] },
      ],
      // canActivate:[AdminGuard],canActivateChild:[AdminGuard]
    },
  ];
  
  export const ADMIN_ROUTING = RouterModule.forChild(admin_routes);