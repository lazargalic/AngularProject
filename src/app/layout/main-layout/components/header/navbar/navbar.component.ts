import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JwtHandlerComponent } from 'src/app/shared/middlewares/jwt-handler/jwt-handler.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isLoggedIn: boolean = false;
  public isAdmin: boolean = false;

  constructor(private jwtHandler: JwtHandlerComponent, 
              private router : Router,
              private toastr: ToastrService,
              private elementRef : ElementRef,
              private renderer: Renderer2) {  }

  ngOnInit(): void { 
    this.isLoggedIn= this.jwtHandler.IsValidToken();
    this.isAdmin = this.jwtHandler.IsUserAdmin();

  }
 

  logOut() : void {
      this.jwtHandler.RemoveToken();
      this.toastr.info('Uspešno ste se odjavili!', 'Uspeh');
    //  this.router.navigate(["/home"]);
      window.location.replace('/');
  }


  hideHamburger() : void {
      let element = this.elementRef.nativeElement.querySelector("#navbar");
      this.renderer.removeClass(element, 'in');
  }
}
