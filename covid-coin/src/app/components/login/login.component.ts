import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name: string;
  password: string;


  constructor(private userService: UserService, private router: Router, private toast: ToastrService) { }

  ngOnInit() {
  }

  loginUser() {
    this.userService.loginUser(this.name, this.password).subscribe(
      data => {
        if (data) {
          sessionStorage.setItem('user', JSON.stringify(data));
          let user = JSON.parse(sessionStorage.getItem('user'));
          if (user.Role == 1) {
            this.router.navigateByUrl('/app-home');
          }
          else {
            this.router.navigateByUrl('/deal-center');
          }
        } else {
          this.toast.error('no user found');
        }
      },
      error => {
        this.toast.error('there was an error while logging in');
      }
    );
  }

}
