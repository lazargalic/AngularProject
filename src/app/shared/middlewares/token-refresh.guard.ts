import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { JwtHandlerComponent } from './jwt-handler/jwt-handler.component';
import { RefreshTokenService } from '../services/login/refresh-token.service';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})


export class TokenRefreshGuard implements CanActivate {
  constructor(private jwtHandler: JwtHandlerComponent,
              private router: Router,
              private authService: RefreshTokenService) {}

  canActivate(): boolean {
    if (this.jwtHandler.IsValidToken()) {

      var token = localStorage.getItem("token");
      let headers = new HttpHeaders().set("Authorization","Bearer " + token);

      this.authService.create({}, headers).subscribe({
        next: response =>{

          var newToken = response.token;
          if(response.token)
            this.jwtHandler.SetToken(newToken, );
        },
        error: xhr =>{
          console.log(xhr);
        }
      })

    } 
    return true;
  }
}
