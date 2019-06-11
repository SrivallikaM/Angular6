import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

import {AuthService} from '../auth.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
pageTitle:string="Login";
isLoggedIn:Boolean=false;
  constructor(private _http:HttpClient,private _router:Router,private _auth:AuthService) { }
  
  ngOnInit() {
  }
submit(username,password)
{
 this._auth.login(username,password);
}
}
