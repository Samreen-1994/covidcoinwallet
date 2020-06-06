import { Observable } from 'rxjs';
import { User, LeverageInput } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl;
  public loggedInUser: User;

  constructor(private http: HttpClient) { }

  loginUser(name, password): Observable<any> {
    return this.http.get(this.apiUrl + "/User/LoginUser?name=" + name + "&password=" + password);
  }

  refreshUserDetails(): void {
    this.http.get<any>(this.apiUrl + "/User/RefreshLoggedUser?id=" + this.loggedInUser.Id).subscribe(
      data => {
        this.loggedInUser = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  UpdateLeverage(leverage: number, userId: number) {
    let leverageInput = new LeverageInput();
    leverageInput.leverageId = leverage;;
    leverageInput.userId = userId;

    return this.http.post(this.apiUrl + "/Leverage/UpdateLeverage", leverageInput);
  }

  addUser(u: User): Observable<any> {
    debugger
    return this.http.post(this.apiUrl + "/User/AddUser", u);
  }

  getAllUser(): Observable<any> {
    debugger;
    return this.http.get(this.apiUrl + "/User/GetUsers");
  }

  editUser(user: User): Observable<any> {
    debugger;
    return this.http.post(this.apiUrl + "/User/EditUser", user);
  }
}
