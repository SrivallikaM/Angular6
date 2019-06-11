import { Component, OnInit,Inject,OnChanges, ChangeDetectorRef } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {JQ_TOKEN} from '../../../plugins/jquery.service'
import { CONTEXT } from '@angular/core/src/render3/interfaces/view';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
posts:any;
post:any;
pageTitle:string="Posts List";
user:string;
likeflag:boolean=false;
//postIndex:any={counter:0};
likeIndex:any={counter:0};
linkClicked:boolean=false;
interpretation:any={};
commentArray:any;

  constructor(private _http:HttpClient,private _router:Router,@Inject(JQ_TOKEN) private jQuery:any,private cd:ChangeDetectorRef) { }

  ngOnInit() {
    this._http.get('http://localhost:3000/getPosts').subscribe((data:any)=>{
    
      if(data)
        {
          
          this.posts=data[0];
          this.user=data[1]
        }
       
          });
          
         
          
        
  }
  
   comment(i)
  {
    
    this._http.post('http://localhost:3000/likedby',{"id":i})
    .subscribe((data:any)=>{
 
      this.post=data[0];
      this.commentArray=data[0].comments;
      
      for(let c=0;c<this.commentArray.length;c++)
      {
      
        
        this.jQuery(`<p>${this.commentArray[c]}</p>`).insertAfter(this.jQuery(`#${i}`));
        
      }
    
      this.jQuery(`#${i}`).hide();
      
       
      
       })
     
      

  }

  addComment(i)
  {
    
    this._http.post('http://localhost:3000/addComments',{"id":i,"comments":this.interpretation[i]})
    .subscribe((data:any)=>{
      if(this.jQuery(`#${i}`).is(':hidden'))
      {
        //alert('hi');
        this.jQuery(`<p>${this.interpretation[i]}</p>`).insertAfter(this.jQuery(`#${i}`));
      }
     alert("Successfully Added Comment");
    
       })
     

  }

  inc(i)
  {
    console.log(this.jQuery(`.${i}`));
   
    this._http.post('http://localhost:3000/likePosts',{"id":i}).subscribe((data:any)=>{
      this.jQuery(`.${i}`).text("Liked");
     
     
        })
  }
  likedby(i)
  {
    
    this._http.post('http://localhost:3000/likePosts',{"id":i}).subscribe((data:any)=>{
    
    
     
        })
  }

}
