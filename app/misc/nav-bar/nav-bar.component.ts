import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service'
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
userStatus:boolean=false;
  constructor(private _auth:AuthService) { }

  ngOnInit() {
    
this._auth.$auth.subscribe((data:any)=>
{
  
 

  if(data!=null && data!="" )
  {
    
    this.userStatus=true;
  }
  
})
  }

}
