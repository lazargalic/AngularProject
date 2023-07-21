import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { CONFIGURATION } from 'src/app/constant/configuration';
import { API } from 'src/app/constant/API';

@Injectable({
  providedIn: 'root'
})
export class ReactService extends ApiService<any> {

  constructor(client: HttpClient) {
    super(client, CONFIGURATION.APIURL + API.REACT );
  }

}
