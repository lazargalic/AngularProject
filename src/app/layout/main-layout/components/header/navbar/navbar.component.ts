import { Component, OnInit } from '@angular/core';
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

  constructor(private jwtHandler: JwtHandlerComponent, private router : Router, private toastr: ToastrService ) {  }

  ngOnInit(): void { 
    this.isLoggedIn= this.jwtHandler.IsValidToken();
    this.isAdmin = this.jwtHandler.IsUserAdmin();

    //alert(this.isLoggedIn);
    //alert(this.isAdmin);
  }
 

  logOut() : void {
      this.jwtHandler.RemoveToken();
      this.toastr.info('Uspešno ste se odjavili!', 'Uspeh');
    //  this.router.navigate(["/home"]);
      window.location.replace('/');
  }

}
