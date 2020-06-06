import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  uploadImage(imageData: any): Observable<any> {
    debugger
    return this.http.post(this.apiUrl + "/Upload/UploadFiles", imageData);
  }
}
