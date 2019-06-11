import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './misc/register/register.component';
import { PostsComponent } from './posts/createPosts/createPosts.component';
import { PanelBoxComponent } from './misc/panel-box/panel-box.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { WelcomeComponent } from './misc/welcome/welcome.component';
import { NavBarComponent } from './misc/nav-bar/nav-bar.component';
import { AuthService } from './auth/auth.service';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthInterceptorService} from './auth/auth-interceptor.service';
 import { PostListComponent } from './posts/post-list/post-list.component';
import { NestedComponentComponent } from './posts/nested-component/nested-component.component';
import {JQ_TOKEN} from '../plugins/jquery.service'
import { RouterModule } from '@angular/router';
import { LikedbyComponent } from './posts/likedby/likedby.component';

let jquery:any=window['jQuery'];

@NgModule({
  declarations: [
    
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PostsComponent,
    PanelBoxComponent,
    WelcomeComponent,
    NavBarComponent,
     PostListComponent,
    NestedComponentComponent,
    
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthService,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptorService,
    multi:true
  },
{
  provide:JQ_TOKEN,
  useValue:jquery

}],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
