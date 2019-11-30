import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

  }

  signin(data): Promise<any> {
    return this.http.post(`${environment.apiUrl}auth/signin`, data).toPromise();
  }

  singup(data): Promise<any> {
    return this.http.post(`${environment.apiUrl}auth/signup`, data).toPromise();
  }
}
