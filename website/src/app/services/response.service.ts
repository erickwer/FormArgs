import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  constructor(private http: HttpClient) { }

  add(data): Promise<any> {
    return this.http.post(`${environment.apiUrl}responses`, data).toPromise();
  }
  getOne(argument_id: string): Promise<any>{
    return this.http.get(`${environment.apiUrl}responses/${argument_id}`).toPromise();
  }
}
