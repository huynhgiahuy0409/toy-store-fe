import { Age } from './../../_models';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgeService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httClient: HttpClient) {}
  findAll(): Observable<Age[]> {
    return this.httClient.get<Age[]>('https://toy-store-be.herokuapp.com//api/ages', this.httpOptions);
  }
}
