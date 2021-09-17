import { PaginationResult, UseObject} from './../../_models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UseObjectService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    params: {},
  };
  constructor(private httpClient: HttpClient) {}
  findAll(): Observable<UseObject[]> {
    return this.httpClient.get<UseObject[]>(`https://toy-store-be.herokuapp.com/api/use-objects`, this.httpOptions);
  }
}
