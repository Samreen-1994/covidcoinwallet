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
}
