import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { IPosts } from '../../interfaces/i-posts';
import { HttpClient } from '@angular/common/http';
import { CONFIGURATION } from 'src/app/constant/configuration';
import { API } from 'src/app/constant/API';

@Injectable({
  providedIn: 'root'
})
export class SingleService extends ApiService<IPosts>{

  constructor(client: HttpClient ) { 
    super(client, CONFIGURATION.APIURL + API.SINGLE)
  }
  

}



