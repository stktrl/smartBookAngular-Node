import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { AddmemberComponent } from './addmember/addmember.component';
import { AuthGuard } from './authGuard/auth.guard';
import { LoginComponent } from './login/login.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberupdateComponent } from './memberupdate/memberupdate.component';
import { RegisterComponent } from './register/register.component';
import { RentbookComponent } from './rentbook/rentbook.component';
import { RentbooklistComponent } from './rentbooklist/rentbooklist.component';
import { UpdatebookinformationComponent } from './updatebookinformation/updatebookinformation.component';
import { UserhomepageComponent } from './userhomepage/userhomepage.component';

const routes: Routes = [
  {path:"",redirectTo:"/login",pathMatch:'full'},
  {path:"login",component:LoginComponent},
  {path:"signup",component:RegisterComponent},
  {path:"userhomepage",component:UserhomepageComponent,canActivate:[AuthGuard]},
  {path:"updateBookInformation/:_id",component:UpdatebookinformationComponent,canActivate:[AuthGuard]},
  {path:"addbook",component:AddBookComponent,canActivate: [AuthGuard]},
  {path:"memberlist",component:MemberListComponent,canActivate: [AuthGuard]},
  {path:"addmember",component:AddmemberComponent,canActivate: [AuthGuard]},
  {path:"updateMemberInformation/:_id",component:MemberupdateComponent,canActivate: [AuthGuard]},
  {path:"rentbook/:_id",component:RentbookComponent,canActivate: [AuthGuard]},
  {path:"rentbooklist",component:RentbooklistComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
