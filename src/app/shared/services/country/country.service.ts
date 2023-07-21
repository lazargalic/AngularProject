import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { ICountry } from '../../interfaces/i-country';
import { HttpClient } from '@angular/common/http';
import { CONFIGURATION } from 'src/app/constant/configuration';
import { API } from 'src/app/constant/API';

@Injectable({
  providedIn: 'root'
})
export class CountryService extends ApiService<ICountry> {

  constructor(client: HttpClient) {
    super(client, CONFIGURATION.APIURL + API.COUNTRIES );
 }

}
