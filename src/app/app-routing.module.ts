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

const routes: Routes = [    
{
  path: "",
  component : MainLayoutComponent,

    children: [
      {
        path: "",
        redirectTo: "/home",
        pathMatch: "full"
      },
    {
      path: "home",
      component: HomeComponent
    },
    {
      path: "posts",
      component: PostsComponent
    },
    {
      path: "single/:id",
      component: SingleComponent,
    },
    {
      path: "add-post",
      component: AddPostComponent
    },
    {
      path: "add-post-reg",
      canActivate: [AuthGuard],
      component: AddPostRegComponent
    },
    {
      path: "login",
      component: LoginComponent
    },
    {
      path: "register",
      component: RegisterComponent
    },
    {
      path: "admin-posts",
      canActivate: [AdminGuard],
      component: AdminPostsComponent
    },
    {
    path: "admin-users",
    canActivate: [AdminGuard],
    component: AdminUsersComponent
    },
    /*{
      path: "contact",
      component: ContactComponent
    },*/
    {
      path: "about",
      component: AboutComponent
    },
    {
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
