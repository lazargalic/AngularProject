import { Component, OnInit, Renderer2 } from '@angular/core';
import { JwtHandlerComponent } from 'src/app/shared/middlewares/jwt-handler/jwt-handler.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private user: JwtHandlerComponent, private renderer : Renderer2) {}
  ngOnInit(){
    this.scrollToTop();
  }

  scrollToTop() {
    this.renderer.setProperty(document.documentElement, 'scrollTop', 0);
  }

}
