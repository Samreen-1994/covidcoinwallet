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

  ngOnInit() {
  }

  logoutUser() {
    this.userService.loggedInUser = null;
    this.router.navigateByUrl('app-login');
  }
}
