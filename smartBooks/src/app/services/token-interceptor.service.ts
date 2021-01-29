import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import { AuthService } from '../services/auth.service'
@Injectable({
  providedIn: 'root'
})
export class TokenIntercepterService implements HttpInterceptor {
  intercept(req:any,next:any){
    let authService = this._injector.get(AuthService)
    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${authService.getToken()}` 
      }
    })
    return next.handle(tokenizedReq)
  }
  constructor( private _injector:Injector) { }
}
