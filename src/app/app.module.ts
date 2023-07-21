import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { HomeModule } from './home/home.module';
import { PostsModule } from './posts/posts.module';
import { AboutModule } from './about/about.module';
import { SharedModule } from './shared/shared.module';
import { SingleModule } from './single/single.module';
import { AddPostModule } from './add-post/add-post.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { AdminUsersComponent } from './admin/admin-users/admin-users.component';  ///
import { AdminPostsComponent } from './admin/admin-posts/admin-posts.component';  ///
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { EditPostDialogComponent } from './admin/dialogs/edit-post-dialog/edit-post-dialog.component';
import { DeletePostDialogComponent } from './admin/dialogs/delete-post-dialog/delete-post-dialog.component';
import { EditUserDialogComponent } from './admin/dialogs/edit-user-dialog/edit-user-dialog.component';
import { DeleteUserDialogComponent } from './admin/dialogs/delete-user-dialog/delete-user-dialog.component';
import { MyDatePipe } from './shared/pipes/my-date-pipe';
import { AddPostRegComponent } from './add-post-reg/add-post-reg/add-post-reg.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminUsersComponent,
    AdminPostsComponent,
    EditPostDialogComponent,
    DeletePostDialogComponent,
    EditUserDialogComponent,
    DeleteUserDialogComponent,
    AddPostRegComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HomeModule,
    AboutModule,
    SharedModule,
    AddPostModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, //
    ToastrModule.forRoot(),
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
//     PostsModule,
 //   SingleModule
 //Fale mi ova dva modula ali radi mi sve bez njih , kad ih dodam crne mi pipe ,a ni u sharedu ih ne pozuvam nzm odakle se pozivaju

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
