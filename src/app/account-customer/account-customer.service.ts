import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from "@angular/core";

export interface TitleBoxInf{
  title: string,
  titleBoxImage: string
}

@Injectable({
  providedIn: 'root',
})
export class AccountCustomerService {
  public titleBoxInfBSub = new Subject<TitleBoxInf>();
  public titleBoxInf$ = this.titleBoxInfBSub.asObservable();
}
