import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { ADMIN_ROUTING } from "./admin.routing";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { ManageAuctionsComponent } from "./manage-auctions/manage-auctions.component";
import { ManageCategoriesComponent } from "./category/manage-categories/manage-categories.component";
import { ManageCommentsComponent } from "./manage-comments/manage-comments.component";
import { ManageProductsComponent } from "./manage-products/manage-products.component";


import { ManageProposalsComponent } from './manage-proposals/manage-proposals.component';
import { AddOffersComponent } from "./Offers/add-offers/add-offers.component";
import { DetailOffersComponent } from "./Offers/detail-offers/detail-offers.component";
import { ListeOffersComponent } from "./Offers/liste-offers/liste-offers.component";
import { ManageOffersComponent } from "./Offers/manage-offers/manage-offers.component";
import { UpdateOffersComponent } from "./Offers/update-offers/update-offers.component";
import { AddUserComponent } from './Users/add-user/add-user.component';
import { ManageUserComponent } from './Users/manage-user/manage-user.component';
import { UpdateUserComponent } from './Users/update-user/update-user.component';
import { UserListComponent } from './Users/user-list/user-list.component';
import { UserDetailComponent } from './Users/user-detail/user-detail.component';


@NgModule({
    declarations: [
      DashboardComponent,
      MainPageComponent,
      MainPageComponent,
      ManageProductsComponent,
      ManageAuctionsComponent,
      ManageCategoriesComponent,
      ManageCommentsComponent,
      ManageProposalsComponent,
 
    ManageOffersComponent,
    AddOffersComponent,
    UpdateOffersComponent,
    ListeOffersComponent,
    DetailOffersComponent,
    AddUserComponent,
    ManageUserComponent,
    UpdateUserComponent,
    UserListComponent,
    UserDetailComponent,
  
    ],
    imports: [
      CommonModule,FormsModule, ADMIN_ROUTING,BrowserModule,
      ReactiveFormsModule,
    ],
  })
  export class AdminModule { }