import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './misc/register/register.component';
import { PostsComponent } from './posts/createPosts/createPosts.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { WelcomeComponent } from './misc/welcome/welcome.component';
import {AuthGuard} from './auth/auth.guard';
 import {LikedbyComponent} from './posts/likedby/likedby.component'
import { NestedComponentComponent } from './posts/nested-component/nested-component.component';

const routes: Routes = [
 
 
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"posts",component:PostsComponent,canActivate:[AuthGuard]},
  {path:"postList",component:PostListComponent,canActivate:[AuthGuard],pathMatch:"full"},
  {path:"postList",loadChildren:'./posts/likedby/likedby.module#LikedbyModule'},
  //{path:"likedby/:i",component:LikedbyComponent,canActivate:[AuthGuard],outlet:'likePopUp'},
  
  {path:"Welcome",component:WelcomeComponent,canActivate:[AuthGuard]}, 
  {path:"detail/:i",component:NestedComponentComponent,canActivate:[AuthGuard]},
  
  {path:"",redirectTo:"login",pathMatch:"full"},
  {path:"**",redirectTo:"login"},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
