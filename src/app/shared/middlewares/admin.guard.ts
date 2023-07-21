import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHandlerComponent } from './jwt-handler/jwt-handler.component';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private jwtHandler: JwtHandlerComponent, private router: Router) {}

  canActivate(): boolean {
    if (this.jwtHandler.IsUserAdmin()) {
      return true;
    } else {
      this.router.navigate(['/']); // Preusmeravanje na login stranicu ako korisnik nije ulogovan
      return false;
    }
  }
}