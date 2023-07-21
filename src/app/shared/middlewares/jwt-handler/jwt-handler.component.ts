import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IApplicationUser } from 'src/app/shared/interfaces/i-application-user';

@Injectable({
  providedIn: 'root'
})
export class JwtHandlerComponent {

  private jwtHelper: JwtHelperService;

  constructor() {
    this.jwtHelper = new JwtHelperService();
  }

  SetToken(token: string) {
    const decodedToken = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
    //localStorage.setItem('user', JSON.stringify(decodedToken));
  }

  RemoveToken() {
    localStorage.removeItem("token");
    //localStorage.removeItem("user");
  }

  IsValidToken(): boolean {
    const token = localStorage.getItem("token");
    if (!token) return false;
    return !this.jwtHelper.isTokenExpired(token);
  }

  IsUserAdmin(): boolean {
    const token = localStorage.getItem("token");
    if (!token) return false;
    if (this.jwtHelper.isTokenExpired(token)) {
      return false;
    }
    const decodedToken = this.jwtHelper.decodeToken(token);
    if(decodedToken.RoleId!=2){
      return false;
    }
    return true;

  }

   GetUser(): IApplicationUser {
    const userString = localStorage.getItem("token");
    return userString ? this.jwtHelper.decodeToken(userString) : null;
  } 
}
