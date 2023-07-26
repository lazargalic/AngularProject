
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHandlerComponent } from './jwt-handler/jwt-handler.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private jwtHandler: JwtHandlerComponent, private router: Router) {}

  canActivate(): boolean {
    if (this.jwtHandler.IsValidToken()) {
      return true;
    } else {
      this.router.navigate(['/login']); // Preusmeravanje na login stranicu ako korisnik nije ulogovan
      return false;
    }
  }
}

