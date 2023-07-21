import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorService } from './services/author/author.service';
import { JwtHandlerComponent } from './middlewares/jwt-handler/jwt-handler.component';
 
import { PostsModule } from '../posts/posts.module';
import { SingleModule } from '../single/single.module';
import { AddPostModule } from '../add-post/add-post.module';
import { MyDatePipe } from './pipes/my-date-pipe';


@NgModule({
  declarations: [

  ],   //komponente
  
  
  imports: [
        //moduli
    CommonModule  ,
       PostsModule,
     SingleModule, 
     AddPostModule,

     
   //Fale mi ova dva modula ali radi mi sve bez njih . //Fale mi ova dva modula ali radi mi sve bez njih , kad ih dodam crne mi pipe ,a ni u sharedu ih ne pozuvam nzm odakle se pozivaju
  ],
  providers: [
    AuthorService,     //servisi 
    JwtHandlerComponent    //Ovde je trebaloo da se doda za handler jer je vracao errors no providers, zasto je on provider ?
                            // i zasto je moralo ovde i zasto nije moglo bez toga kad je samo komponenta i metoda kod njega ????
                            
  ]
})
export class SharedModule { }
