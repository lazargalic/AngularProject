import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HeaderComponent } from './main-layout/components/header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FooterComponent } from './main-layout/components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './main-layout/components/header/navbar/navbar.component';


@NgModule({
  declarations: [
    MainLayoutComponent,
    FooterComponent,
    HeaderComponent,
    NotFoundComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    HttpClientModule,
    
  ]
})
export class LayoutModule { }
