import { Injectable } from '@angular/core';
import { IUsers } from '../../interfaces/i-users';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { CONFIGURATION } from 'src/app/constant/configuration';
import { API } from 'src/app/constant/API';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends ApiService<IUsers> {

  constructor(client: HttpClient) {
    super(client, CONFIGURATION.APIURL + API.REGUSER );
 }

}
