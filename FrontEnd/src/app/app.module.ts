import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProposalComponent } from './proposal/proposal.component';
import { AddOfferComponent } from './add-offer/add-offer.component';

import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddCategoryComponent } from './admin/category/add-category/add-category.component';
import { CategoryComponent } from './category/category.component';
import { TimerComponent } from './timer/timer.component';

import { UserComponent } from './user/user.component';
import { GlobalComponent } from './global/global.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountServiceService } from './services/account-service.service';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { FilterComponent } from './filter/filter.component';
import { ListeOfferComponent } from './liste-offer/liste-offer.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminModule } from './admin/admin.module';
import { ListeProductComponent } from './liste-product/liste-product.component';


import { OfferServiceService } from './services/offer-service.service';
import { ProductService } from './services/product.service';
import { AuthGuard } from './auth.guard';
import { AdminService } from './services/admin.service';
import { AdminGuard } from './admin.guard';
import { EssComponent } from './ess/ess.component';
import { ShortPipe } from './short.pipe';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ProposalComponent,
    AddOfferComponent,
   
    AddProductComponent,
    AddCategoryComponent,
    CategoryComponent,
    TimerComponent,

    UserComponent,
    GlobalComponent,
    UpdateUserComponent,
    UpdateProductComponent,
    FilterComponent,
    ListeOfferComponent,
     ViewProductComponent, 
     ListeProductComponent, EssComponent, ShortPipe, 


  
 
  
 

    
   
  

 
  ],
  imports: [
    BrowserModule,
    FormsModule, //on a ajouter formsmodule pour pouvoir utiliser le « Two way Binding » avec la directive ngModel
    HttpClientModule,
    AppRoutingModule,
    RouterModule, 
    ReactiveFormsModule, 
    AdminModule,


    
     
  ], 
  providers: [AccountServiceService,OfferServiceService,ProductService,AuthGuard,AdminService,AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
