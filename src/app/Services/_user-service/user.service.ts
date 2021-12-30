import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models';
import { DOMAIN } from 'src/app/_models/constant';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
  };
  constructor(private httpClient: HttpClient) {}
  updateUser(user: User): Observable<User> {
    let url = `${DOMAIN}/api/user/update`;
    return this.httpClient.post<User>(url, user, this.httpOptions);
  }
}
