import { Injectable } from '@angular/core';
import {HttpInterceptor,HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service'
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private _auth:AuthService) { }

  intercept(req,next)
  {
    var reqClone=req.clone({
      headers:new HttpHeaders().set("authtoken",this._auth.checkLogin()),
    })
    return next.handle(reqClone);
  }
}
