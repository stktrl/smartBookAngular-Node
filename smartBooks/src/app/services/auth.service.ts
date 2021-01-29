import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerUrl = "http://localhost:3000/api/register"
  private _loginUrl = "http://localhost:3000/api/login"
  constructor(private http: HttpClient,
              private _router:Router) { }
  signUpUser(user: {}){
    //const jsonUser = JSON.stringify(user)
    return this.http.post<any>(this._registerUrl,user)
  }
  logInUserApi(logInUser:{}){

    return this.http.post<any>(this._loginUrl,logInUser)
  }
  loggedIn(){
    return !!localStorage.getItem('token')
  }
  getToken(){
    return localStorage.getItem('token')
  }
  logOutuser(){
    localStorage.removeItem('token')
    this._router.navigate(["/login"])
  }
}
