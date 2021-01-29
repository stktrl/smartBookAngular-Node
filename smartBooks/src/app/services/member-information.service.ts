import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class MemberInformationService {
  private _memberAdd ="http://localhost:3000/api/addmember"
  private _memberList ="http://localhost:3000/api/memberlist"
  private _memberDelete ="http://localhost:3000/api/memberdelete"
  private _memberUpdate = "http://localhost:3000/api/memberupdate"
  private _memberInfo ="http://localhost:3000/api/memberInformation"
  constructor(private http: HttpClient) { }
  addMember(item:{}){
    return this.http.post<any>(this._memberAdd,item,{observe: 'response'})

  }
  memberUpdate(memberid: {}){
    return this.http.post<any>(this._memberUpdate,memberid,{observe: 'response'})
  }
  memberDelete(memberid:{}){
    return this.http.post<any>(this._memberDelete,memberid,{observe: 'response'})

  }
  findMemberById(memberid: {}){
    //const jsonUser = JSON.stringify(user)
    return this.http.get<any>(this._memberInfo+'/?_id='+memberid)
  }
  getMemberList(){
    
    return this.http.get<any>(this._memberList)
  }
}
