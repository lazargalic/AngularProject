import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HomeComponent } from './home/home/home.component';
import { AboutComponent } from './about/about/about.component';
//import { ContactComponent } from './contact/contact/contact.component';
import { AddPostComponent } from './add-post/add-post/add-post.component';
import { SingleComponent } from './single/single/single.component';
import { PostsComponent } from './posts/posts/posts.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminPostsComponent } from './admin/admin-posts/admin-posts.component';
import { AuthGuard } from './shared/middlewares/auth.guard';
import { AdminGuard } from './shared/middlewares/admin.guard';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AddPostRegComponent } from './add-post-reg/add-post-reg/add-post-reg.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { SuccessfulRegisterComponent } from './register/successful-register/successful-register.component';
import { TokenRefreshGuard } from './shared/middlewares/token-refresh.guard';

const routes: Routes = [    
{
  path: "",
  component : MainLayoutComponent,
  //refresh Token
    children: [
      {
        path: "",
        redirectTo: "/home",
        pathMatch: "full"
      },
    {
      canActivate:[TokenRefreshGuard],
      path: "home",
      component: HomeComponent
    },
    {
      canActivate:[TokenRefreshGuard],
      path: "posts",
      component: PostsComponent
    },
    {
      canActivate:[TokenRefreshGuard],
      path: "single/:id",
      component: SingleComponent,
    },
    {
      canActivate:[TokenRefreshGuard],
      path: "add-post",
      component: AddPostComponent
    },
    {
      path: "add-post-reg",
      canActivate: [AuthGuard, TokenRefreshGuard],
      component: AddPostRegComponent
    },
    {
      canActivate:[TokenRefreshGuard],
      path: "login",
      component: LoginComponent
    },
    {
      canActivate:[TokenRefreshGuard],
      path: "register",
      component: RegisterComponent
    },
    {
      path: "my-posts",
      canActivate: [AuthGuard, TokenRefreshGuard],
      component: MyPostsComponent
    },
    {
      path: "admin-posts",
      canActivate: [AdminGuard, TokenRefreshGuard],
      component: AdminPostsComponent
    },
    {
    path: "admin-users",
    canActivate: [AdminGuard,TokenRefreshGuard],
    component: AdminUsersComponent
    },
    {
      path: "successful-register/:guid",
      component: SuccessfulRegisterComponent
    },
    /*{
      path: "contact",
      component: ContactComponent
    },*/
   /* {
      path: "about",
      component: AboutComponent
    }, */
    {
      canActivate:[TokenRefreshGuard],
      path: '**',
      component:NotFoundComponent
    }

  ] 
} ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
