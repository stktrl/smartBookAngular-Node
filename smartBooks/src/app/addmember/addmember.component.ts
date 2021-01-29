import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
import { MemberInformationService } from '../services/member-information.service';

@Component({
  selector: 'app-addmember',
  templateUrl: './addmember.component.html',
  styleUrls: ['./addmember.component.css']
})
export class AddmemberComponent implements OnInit {
  member: any={}
  constructor(private alertify:AlertifyService,
    private _router: Router,
    private _memberInformation:MemberInformationService) { }

  ngOnInit(): void {
  }
  addMember(item:any){
    this.member=item
    this._memberInformation.addMember(item).subscribe(  res=> {
      if(res.status===200){
        this.alertify.mySuccess("Başarıyla Eklendi")
        this._router.navigate(["/memberlist"])
      }else{
        this.alertify.myErr("")
      }
    },
    err => this.alertify.myErr(err))
  }
}
