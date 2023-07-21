import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPosts } from 'src/app/shared/interfaces/i-posts';
import { ApiService } from 'src/app/shared/services/api.service';
import { PostsService } from 'src/app/shared/services/posts/posts.service';
import { SingleService } from 'src/app/shared/services/single/single.service';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {
  
  public myPost : IPosts;
  public fromUrl: any;  ////// Hardkodovano  const postPath = API.POSTS.replace("$$", myVariable);

  receivedMessage : any;

  constructor(public singleService: SingleService, private route : ActivatedRoute, private renderer: Renderer2, private elementRef : ElementRef) { }
  
  handleCustomEvent(event: any) {
    this.loadPost();
  }

  ngOnInit(): void { 
      this.loadPost();
      this.scrollToTop();
  }

  
  loadPost() : void {
    // U roditelju komponenti obradite primljeni događaj
    this.route.paramMap.subscribe(params => {
      this.fromUrl = params.get("id"); 
    })
    //servis
    this.singleService.getOne(this.fromUrl).subscribe({
      next: responses =>{
        this.myPost = responses;

        var spinner = this.elementRef.nativeElement.querySelector(".loading-spinner");
        this.renderer.removeClass(spinner, 'loading-spinner');
        

      },
      error: xhr =>{
        console.log(xhr);
      }
    })
}

  scrollToTop() {
    // Koristite Renderer2 za postavljanje pozicije prozora na vrh stranice
    this.renderer.setProperty(document.documentElement, 'scrollTop', 0);
  }

  
}
