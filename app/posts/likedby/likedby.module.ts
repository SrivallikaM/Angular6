import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikedbyComponent } from './likedby.component';
import { RouterModule } from '@angular/router';
import {AuthGuard} from '../../auth/auth.guard';

@NgModule({
  declarations: [LikedbyComponent],
  imports: [
    CommonModule,
RouterModule.forChild([
  
  { path: ':i',component:LikedbyComponent,
  canActivate:[AuthGuard] ,outlet: 'likePopUp'},
])
  ]
})
export class LikedbyModule { }
