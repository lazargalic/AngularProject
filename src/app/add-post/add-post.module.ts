import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

//import { AddPostRoutingModule } from './add-post-routing.module';
import { AddPostComponent } from './add-post/add-post.component';
import { FormAddComponent } from './add-post/components/form-add/form-add.component';
import { PageBannerComponent } from './add-post/components/page-banner/page-banner.component';


@NgModule({
  declarations: [
    AddPostComponent,
    FormAddComponent,
    PageBannerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
    //AddPostRoutingModule
  ]
})
export class AddPostModule { }
