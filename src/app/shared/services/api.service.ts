import { Inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONFIGURATION } from 'src/app/constant/configuration';
import { API } from 'src/app/constant/API';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiService<T> {

  constructor(protected client: HttpClient, @Inject("url") protected path: string) { } 

  getAllRegUsersFilter(keyword?:string, headers?: HttpHeaders) {
    let urlFinal = this.path ; 
    const queryParams: string[] = [];
    if (keyword) {  queryParams.push(`Keyword=${keyword}`); }
    if (queryParams.length > 0) {
      urlFinal += `?${queryParams.join('&')}`;
   }
    return this.client.get<T[]>(urlFinal,  {headers});
  }
  

  getAllPagination(nameArticle?:string, 
    beggin?: string, 
    end?: string, 
    countryId? : string,
    townships?: string[], 
    categoryDimensionId?: string, 
    headers?: HttpHeaders,
    perPage? :number,
    page? :number): Observable<T>{
    
    let urlFinal = this.path ;  
      
    //QueryString
    const queryParams: string[] = [];
    if (nameArticle) {  queryParams.push(`NameArticle=${nameArticle}`); }
    if (beggin) {  queryParams.push(`Beggin=${beggin}`); }
    if (end) {  queryParams.push(`End=${end}`); }
    if (countryId) {  queryParams.push(`CountryId=${countryId}`); }
    if(townships.length) {
      for(let id of townships){
        queryParams.push(`Townships=${id}`); 
      }
    }
    if (categoryDimensionId) {  queryParams.push(`CategoryDimensionId=${categoryDimensionId}`); }
    if (perPage) {
      queryParams.push(`PerPage=${perPage}`);
    }
    if (page) { queryParams.push(`Page=${page}`);  }

    if (queryParams.length > 0) {
       urlFinal += `?${queryParams.join('&')}`;
    }
    console.log(urlFinal);  

    return this.client.get<T>(urlFinal,  {headers});  //headers nzm sta je 
  }

  getAll(headers?: HttpHeaders) {
      return this.client.get<T[]>(this.path,  {headers});
  }

  getOne(id: number | string, headers?: HttpHeaders): Observable<T> {
      let options = { headers };
      return this.client.get<T>(this.path + "/" + id, options);
  }

  create(dataToSend: any, headers?: HttpHeaders): Observable<any> {
    let options = { headers, body: dataToSend };
    return this.client.post(this.path, dataToSend, options);
  }

  createFormData(formData: FormData, headers?: HttpHeaders): Observable<any> {
    console.log(formData);
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    let options = { headers };
    return this.client.post(this.path, formData, options);
  }

  update(dataToSend: any, headers?: any): Observable<any>  {
    let options = { headers, body: dataToSend };
    return this.client.put( this.path, dataToSend, options);
  }

  delete(dataToSend: any , headers?: any): Observable<any>  {
    let options = { headers, body: dataToSend };
    return this.client.delete(this.path, options );
  }

  deleteWithUrl(id: any , headers?: any): Observable<any>  {
    let options = { headers };
    return this.client.delete(this.path + "/" +id, options );
  }


 



  /*get(id: number | string): Observable<any> {
    return this.http.get(config.SERVER + this.path + "/" + id);
  }*/


  /*
    getOneObj(): Observable<T>{
    return this.client.get<T>(this.url);  
  
    //return this.client.get<T>(urlFinal, {headers});
    
  }
  */



  
}