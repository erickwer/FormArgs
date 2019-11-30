import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArgumentService {

  constructor(private http: HttpClient) { }

  getAll(): Promise<any> {
    return this.http.get(`${environment.apiUrl}arguments`).toPromise();
  }

  getArgument(argument_id: string): Promise<any> {
    return this.http.get(`${environment.apiUrl}arguments/${argument_id}`).toPromise();
  }

  addArgument(data): Promise<any> {
    return this.http.post(`${environment.apiUrl}arguments`, data).toPromise();
  }

  addPremise(data): Promise<any> {
    return this.http.post(`${environment.apiUrl}arguments/premises`, data).toPromise();
  }
  deletePremise(premise_id: string): Promise<any> {
    return this.http.delete(`${environment.apiUrl}arguments/premise/${premise_id}`).toPromise();
  }
  deleteAgument(argument_id: string): Promise<any> {
    return this.http.delete(`${environment.apiUrl}arguments/${argument_id}`).toPromise();
  }
}
