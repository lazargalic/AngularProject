import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { IFooter } from '../../interfaces/i-footer';
import { CONFIGURATION } from 'src/app/constant/configuration';
import { API } from 'src/app/constant/API';

@Injectable({
  providedIn: 'root'
})
export class FooterService extends ApiService<IFooter>{

  constructor(client: HttpClient) {
    super(client, CONFIGURATION.JSONURL + API.FOOTER );
 }

}
