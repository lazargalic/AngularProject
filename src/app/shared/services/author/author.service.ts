import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { IAuthor } from '../../interfaces/i-author';
import { CONFIGURATION } from 'src/app/constant/configuration';
import { API } from 'src/app/constant/API';

@Injectable({
  providedIn: 'root'
})

export class AuthorService extends ApiService<IAuthor> {

  constructor(client: HttpClient) {
      super(client, CONFIGURATION.JSONURL + API.AUTHOR );
   }
}

