import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Key } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  token = '8721a5fca6d81c64f69f8c589c0ced08qdi1EMZJ9tplyx+tZSAawlZzSdgpXUESJMyuRtDbQEcmJOP6md59vkegTjbqzx/l'
  constructor(private http: HttpClient) { }
 

  sendExercise(data): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer a1247dd2519ac04a602927fe04bcb129zJyrGtrrr3JMpjRWfnKjWnLfxbbKfcrJY62j5Nekmb98OMX7eY37DYrWyw/A1CB8'
    })
    }
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer '+this.token)
    return this.http.post(`${environment.apiPlatUrl}exercicio/`, data, httpOptions).toPromise();
  }

  getReward(): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '
    })
    }
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer '+this.token)
    return this.http.get(`${environment.apiPlatUrl}recompensa/`, httpOptions).toPromise().then(data=>data)
    }

    getLevels(): Promise<any> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '
      })
      }
      httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer '+this.token)
      return this.http.get(`${environment.apiPlatUrl}nivel/`, httpOptions).toPromise().then(data=>data)
      }

}