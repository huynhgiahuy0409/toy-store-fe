import { Age } from './../../_models';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DOMAIN } from 'src/app/_models/constant';

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
    return this.httClient.get<Age[]>(`${DOMAIN}/api/ages`, this.httpOptions);
  }
}
