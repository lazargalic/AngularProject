import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SliderComponent } from './home/components/slider/slider.component';
import { DescriptionComponent } from './home/components/description/description.component';
import { PageBannerComponent } from './home/components/page-banner/page-banner.component';


@NgModule({
  declarations: [
    HomeComponent,
    SliderComponent,
    DescriptionComponent,
    PageBannerComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
