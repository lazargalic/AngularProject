import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthorComponent } from './about/components/author/author.component';


@NgModule({
  declarations: [
    AboutComponent,
    AuthorComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    HttpClientModule
  ]
})
export class AboutModule { }
