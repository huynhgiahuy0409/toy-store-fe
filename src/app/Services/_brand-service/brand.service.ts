import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/_models';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpClient: HttpClient) {}
  findAll(): Observable<Brand[]> {
    return this.httpClient.get<Brand[]>(
      `https://toy-store-be.herokuapp.com/api/brands`,
      this.httpOptions
    );
  }
}
