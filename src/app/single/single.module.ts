import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingleRoutingModule } from './single-routing.module';
import { SingleComponent } from './single/single.component';
import { ArticleComponent } from './single/components/article/article.component';
import { CommentsComponent } from './single/components/comments/comments.component';
 
import { MyDatePipe } from '../shared/pipes/my-date-pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteCommentDialogComponent } from './delete-comment-dialog/delete-comment-dialog.component';


@NgModule({
  declarations: [
    SingleComponent,
    ArticleComponent,
    CommentsComponent,
    DeleteCommentDialogComponent,
    MyDatePipe

  ],
  imports: [
    CommonModule,
    SingleRoutingModule,
    ReactiveFormsModule,
    
  ]
})
export class SingleModule { }
