import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { CONFIGURATION } from 'src/app/constant/configuration';
import { API } from 'src/app/constant/API';
import { INav } from '../../interfaces/i-nav';

@Injectable({
  providedIn: 'root'
})
export class NavbarService extends ApiService<INav> {

  constructor(client: HttpClient) {
      super(client, CONFIGURATION.JSONURL + API.NAV );
   }
}
