import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import {HttpClient} from '@angular/common/http'
@Component({ 
  selector: 'app-likedby',
  templateUrl: './likedby.component.html',
  styleUrls: ['./likedby.component.css']
})
export class LikedbyComponent implements OnInit {
id:number;
likes:any;
likesCount:Number;
  constructor(private _act:ActivatedRoute,private _http:HttpClient,private _route:Router) { }

  ngOnInit() {

    this._act.params.subscribe((data)=>{this.id=data.i;});

    this._http.post('http://localhost:3000/likedBy',{"id":this.id}).subscribe((data:any)=>{
    
    this.likes=data[0].likedBy;
    this.likesCount=data[0].likesCount
     
    })
  }
  close() {
    
    this._route.navigate(['/postList',{ outlets: { likePopUp: null }}]);
 }
}
