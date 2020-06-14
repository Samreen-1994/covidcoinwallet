import { User } from 'src/app/models/user';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public userService: UserService, private router: Router) { }
  loggedUser: User;
  ngOnInit() {
  
    this.loggedUser = JSON.parse(sessionStorage.getItem('user'));
    this.userService.sidebarVisibilityChange.subscribe(
      data => {
        debugger;
        if (data) {
          this.loggedUser=data;
          console.log(data);
          //this.toast.success("Leverage Updated");
          //this.userService.refreshUserDetails();
        }
      }
    )

  }

  logoutUser() {
    sessionStorage.clear();
    this.router.navigateByUrl('app-login');
  }


}
