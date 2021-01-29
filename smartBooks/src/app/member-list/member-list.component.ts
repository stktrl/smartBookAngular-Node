import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import {Member} from '../modelClass/member.model'
import { AlertifyService } from '../services/alertify.service';
import { MemberInformationService } from '../services/member-information.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  filterText=""
  memberList!: Member[]; 
  constructor(private _memberInformation:MemberInformationService, private _router: Router , private forms:FormsModule,private alertify:AlertifyService
    ) { }

  ngOnInit(): void {
    this._memberInformation.getMemberList().subscribe(
      res => this.memberList = res,
      err => {
        if(err instanceof HttpErrorResponse){
          if(err.status===401){
          this._router.navigate(['/login'])
        }
        }
        console.log(err)}

    )
  }
  memberDelete(item:any){

    this._memberInformation.memberDelete(item).subscribe(
     res=> {
       if(res.status==200){
         this.alertify.mySuccess("Başarıyla Silindi")
         this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this._router.navigate(['/memberlist']); // navigate to same route
      }); 
         this._router.navigate(["/userhomepage"])
       }else{
         this.alertify.myErr("")
       }
     },
     err => this.alertify.myErr(err)
     
    )
   
    
  }
  selectedItemUpdate(item:any):void {
    this._router.navigate(['/updateMemberInformation',item._id])
  }

}
