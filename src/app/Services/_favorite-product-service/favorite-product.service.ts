import { FavoriteProduct } from './../../_models/product';
import { HttpHeaders, HttpClient, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationResult } from 'src/app/_models';

@Injectable({
  providedIn: 'root',
})
export class FavoriteProductService {
  private httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json',
    }),
    params: {}
  };
  private httpParamOptions: HttpParamsOptions = {
    fromObject: {},
  };
  constructor(private httpClient: HttpClient) {}
  addToWishlist(
    userId: number,
    productId: number
  ): Observable<FavoriteProduct> {
    let url = `https://toy-store-be.herokuapp.com/api/favorite-product?userId=${userId}&productId=${productId}`;
    return this.httpClient.post<FavoriteProduct>(url, this.httpOptions);
  }
  findAll(action: 'view' | 'remove',userId: number, pageIndex: number, limit: number, favProductId?: number): Observable<PaginationResult<FavoriteProduct>> {
    this.httpParamOptions = {
      fromObject: {
        action: action,
        userId: userId,
        pageIndex: pageIndex,
        limit: limit
      }
    };
    if(action == 'remove' && favProductId){
      this.httpParamOptions.fromObject = {
        ...this.httpParamOptions.fromObject,
        favProductId: favProductId
      }
    }
    this.httpOptions.params = new HttpParams(this.httpParamOptions)
    let url = `https://toy-store-be.herokuapp.com/api/favorite-product`;
    return this.httpClient.get<PaginationResult<FavoriteProduct>>(url, this.httpOptions)
  }
}
