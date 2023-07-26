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
      if(!this.jwtHandler.IsValidToken()){
        this.router.navigate(['/login']); // Preusmeravanje na login stranicu ako je adminu istekao token
        return false;
      }
      return true;
    } else {
      this.router.navigate(['/']); // Preusmeravanje na home stranicu ako korisnik nije admin
      return false;
    }
  }
}