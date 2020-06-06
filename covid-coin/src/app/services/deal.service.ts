import { BuyDealModel, CloseDealInput } from './../models/deal';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Deal } from '../models/deal';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DealService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addDeal(d: Deal): Observable<any> {
    return this.http.post(this.apiUrl + "/Deal/AddNewDeal", d);
  }

  getDeals(): Observable<any> {
    return this.http.get(this.apiUrl + "/Deal/GetDeals");
  }

  buyDeal(buyDeal: BuyDealModel): Observable<any> {
    return this.http.post(this.apiUrl + "/Deal/UserBuyDeal", buyDeal);
  }

  closeDeal(closeDealInput: CloseDealInput): Observable<any> {
    return this.http.post(this.apiUrl + "/Deal/CloseDeal", closeDealInput);
  }
}
