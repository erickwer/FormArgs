import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  
  constructor(private http: HttpClient) { }
 

  sendResponse(data,token): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer a1247dd2519ac04a602927fe04bcb129zJyrGtrrr3JMpjRWfnKjWnLfxbbKfcrJY62j5Nekmb98OMX7eY37DYrWyw/A1CB8'
    })
    }
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer '+token)
    return this.http.post('http://api.thelogiclive.com/api/v1/respostas', data, httpOptions).toPromise();
  }
}
