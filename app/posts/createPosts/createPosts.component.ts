import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-posts',
  templateUrl: './createPosts.component.html',
  styleUrls: ['./createPosts.component.css']
})
export class PostsComponent implements OnInit {
userForm:FormGroup;
pageTitle:string="Create Post"
  constructor(private _fb:FormBuilder,private _http:HttpClient) { }

  ngOnInit() {
    this.userForm=this._fb.group({
      postTitle:["",Validators.required],
      postDesc:["",Validators.required],
    

    });
  }
  submitPost()
  {
   
    this._http.post('http://localhost:3000/submitPosts',{"postTitle":this.userForm.get('postTitle').value,"postDesc":this.userForm.get('postDesc').value},{responseType: 'text'}).subscribe((data:any)=>{
    
    if(data=="Submitted")
      {
        
        alert("Successfully Submitted your Post");
      }
     
        })
  
  }

}
