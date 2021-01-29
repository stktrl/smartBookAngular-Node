import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserhomepageComponent } from './userhomepage/userhomepage.component';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AuthService } from './services/auth.service';
import { BooklistService } from './services/booklist.service';
import { BookfilterPipe } from './userhomepage/bookfilter.pipe';
import { AuthGuard } from './authGuard/auth.guard';
import { TokenIntercepterService } from './services/token-interceptor.service';
import { UpdatebookinformationComponent } from './updatebookinformation/updatebookinformation.component';
import { BookInformationService } from './services/book-information.service';
import { AddBookComponent } from './add-book/add-book.component';
import { MemberInformationService } from './services/member-information.service';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberfilterPipe } from './member-list/memberfilter.pipe';
import { AddmemberComponent } from './addmember/addmember.component';
import { MemberupdateComponent } from './memberupdate/memberupdate.component';
import { RentbookComponent } from './rentbook/rentbook.component';
import { RentbooklistComponent } from './rentbooklist/rentbooklist.component';
import { RentbookfilterPipe } from './rentbooklist/rentbookfilter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UserhomepageComponent,
    NavComponent,
    BookfilterPipe,
    UpdatebookinformationComponent,
    AddBookComponent,
    MemberListComponent,
    MemberfilterPipe,
    AddmemberComponent,
    MemberupdateComponent,
    RentbookComponent,
    RentbooklistComponent,
    RentbookfilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthService,BooklistService,AuthGuard,MemberInformationService,BookInformationService,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenIntercepterService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
