import { Component, OnInit,Input,Output ,EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-nested-component',
  templateUrl: './nested-component.component.html',
  styleUrls: ['./nested-component.component.css']
})
export class NestedComponentComponent implements OnInit {
 
  post:any;
  posts:any;
  code:number;
  pageTitle:string="Selected Post Description";
@Input() post_index:any;
@Output() event :EventEmitter<string>=new EventEmitter()
  constructor(private _http:HttpClient,private _activatedRoute:ActivatedRoute) {
    
   }


ngOnInit() {
  this._activatedRoute.params.subscribe((data)=>{this.code=data.i;});
    this._http.get('http://localhost:3000/getPosts').subscribe((data:any)=>{
    
      if(data)
        {
          
          this.post=data[0][this.code];
          
        }
       
          });
         // console.log(this.posts);

          
  
  }

 

}
