import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $auth=new BehaviorSubject(this.checkLogin());
  constructor(private _http:HttpClient,private _router:Router) { }

  checkLogin()
  {
    
    return localStorage.getItem("token") || "";
    
  }

  login(user,pwd)
  {
    this._http.post('http://localhost:3000/getDetails',{"username":user,"password":pwd}).subscribe((data:any)=>{
      if(data.isLoggedIn==true)
      {
       
        localStorage.setItem("token",data.token);
        this.$auth.next(this.checkLogin());
        this._router.navigate(['/Welcome']);
      }
     
        })
  }
}
