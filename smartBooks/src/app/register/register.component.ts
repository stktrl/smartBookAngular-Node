import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signUpUserr = {  
    email: "",
    password: "",
    userName: "",
    userPhone: "",
  }
  constructor(private _auth:AuthService,
              private _router:Router) { }

  ngOnInit(): void {
  }
  signUpUser(){
    this._auth.signUpUser(this.signUpUserr).subscribe(
      res => { 
        localStorage.setItem('token',res.token)
        this._router.navigate(['/userhomepage'])
      },
      err => console.log(err)
    )
  }

}
