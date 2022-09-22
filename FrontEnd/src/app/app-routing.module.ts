
import { RouterModule, Routes } from '@angular/router';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { AddProductComponent } from './add-product/add-product.component';

import { CategoryComponent } from './category/category.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';

import { ListeProductComponent } from './liste-product/liste-product.component';
import { LoginComponent } from './login/login.component';

import { RegisterComponent } from './register/register.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserComponent } from './user/user.component';
import { NotLoggedGuard } from './not-logged.guard';


const routes: Routes = [
  {path:'',component:CategoryComponent},
 
  //{path:'',component:GlobalComponent},
  {path:'login',component:LoginComponent,canActivate:[NotLoggedGuard]},
  {path:'offers',component:HomeComponent},
  
  {path:'user/:id',
    children:[
       {path:'',component:UserComponent},
       {path:'update',component:UpdateUserComponent},
       {path:'listprod',component:ListeProductComponent},
       {path:'updateProduct/:idp',component:UpdateProductComponent},
       {path:'addproduct',component:AddProductComponent},
       {path:'addoffer',component:AddOfferComponent},
    ],  canActivate:[AuthGuard] ,canActivateChild:[AuthGuard]   
       },

  {path:'register',component:RegisterComponent},

  {
    path: 'dashboard',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
  },

  
  {path:'**',redirectTo:''}
  

];



export const  AppRoutingModule=RouterModule.forRoot(routes);
