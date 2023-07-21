import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts/posts.component';
import { PageBannerComponent } from './posts/components/page-banner/page-banner.component';
import { AllPostsComponent } from './posts/components/all-posts/all-posts.component';
import { OnlyPostsComponent } from './posts/components/all-posts/components/only-posts/only-posts.component';
import { PostsService } from '../shared/services/posts/posts.service';
import { FormsModule } from '@angular/forms';
import { CountryService } from '../shared/services/country/country.service';
import { RouterModule } from '@angular/router';
import { MyDatePipe } from '../shared/pipes/my-date-pipe';
import { MyDatePipe2 } from '../shared/pipes/my-date-pipe2';
 

@NgModule({
  declarations: [
    PostsComponent,
    PageBannerComponent,
    AllPostsComponent,
    PageBannerComponent,
    OnlyPostsComponent,
    MyDatePipe2
  ],
  imports: [
    RouterModule,
    CommonModule,FormsModule
    
    
  ],
  providers: [
    CountryService,
    PostsService
    
  ]
})
export class PostsModule { }
