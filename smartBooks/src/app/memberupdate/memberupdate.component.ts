import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
import { MemberInformationService } from '../services/member-information.service';

@Component({
  selector: 'app-memberupdate',
  templateUrl: './memberupdate.component.html',
  styleUrls: ['./memberupdate.component.css']
})
export class MemberupdateComponent implements OnInit {
  member: any ={}

  constructor(private _route :ActivatedRoute,
              private _memberInfo:MemberInformationService,
              private alertify:AlertifyService,
              private _router: Router) { }

  ngOnInit(): void {
    this._route.params.subscribe(param=>{
      let routeParam=param._id;
      console.log(routeParam)
      this._memberInfo.findMemberById(routeParam).subscribe(
        res => this.member=res,
        err => {
          if(err instanceof HttpErrorResponse){
            if(err.status===401){
            this._router.navigate(['/login'])
          }
          }
          console.log(err)}
      )
    })
    
  }
  memberUpdate(){
    this._memberInfo.memberUpdate(this.member).subscribe(
      res=> {
        if(res.status==200){
          this.alertify.mySuccess("Başarıyla Güncellendi")
          this._router.navigate(["/memberlist"])
        }else{
          this.alertify.myErr("")
        }
      },
      err => this.alertify.myErr(err)
    )

   }
  

}
