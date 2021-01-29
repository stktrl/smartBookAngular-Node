import { Injectable } from '@angular/core';

declare let alertify:any
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
  mySuccess(message:string)
  {
    alertify.success(message);
  }
  myErr(message:any){
    alertify.error("Bir sorun oluştu"+message);
    
  }
}
