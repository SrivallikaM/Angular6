import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
pageTitle:string="Register"
auth:any;
  constructor(private _http:HttpClient) { }

  ngOnInit() {
  }

  submit(username,password)
  {
   if(username!=null&&password!=null) 
   {
    this._http.post('http://localhost:3000/saveDetails',{"username":username,"password":password}).subscribe(()=>{
      alert("Successfully Registered!!");
        })
        }
        else
        alert('Either Username or Password is blank!!')
   }  
  

}
