import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logInUser = {  
    email: "",
    password: ""
  }
  constructor(private _auth :AuthService,
              private _router:Router) { }

  ngOnInit(): void {
  }
  logIn(){
    console.log(this.logInUser)
    this._auth.logInUserApi(this.logInUser).subscribe(
      res => {
        localStorage.setItem('token',res.token)
        this._router.navigate(['/userhomepage'])
      },
      err => console.log(err)
    )
  }
}
