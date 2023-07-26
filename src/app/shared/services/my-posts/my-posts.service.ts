import { Injectable } from '@angular/core';
 
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { CONFIGURATION } from 'src/app/constant/configuration';
import { API } from 'src/app/constant/API';
import { IAllPosts } from '../../interfaces/i-all-posts';

@Injectable({
  providedIn: 'root'
})
export class MyPostsService extends ApiService<IAllPosts> {

  constructor(client: HttpClient) {
    super(client, CONFIGURATION.APIURL + API.MYPOSTS );
  }

}