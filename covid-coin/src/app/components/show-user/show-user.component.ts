import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {
  user = new Array<User>();

  constructor(private userService: UserService, private toast: ToastrService, private router: Router) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUser().subscribe(
      res => {
        this.user = res;
        this.user = this.user.filter(x => x.Role == 2);
      },
      err => {
        this.toast.error('Everything is broken');
      }
    )
  }
  deleteUser(u: User): void {
    u.IsActive = false;
    this.userService.editUser(u).subscribe(
      res => {
        if (res) {
          this.toast.success('Deleted');
          this.getAllUsers();
        }
        else {
          this.toast.error('There was some error in deletion');
        }
      },
      err => {
        this.toast.error('Everything is wrong');
      }
    );
  }

  unfreezeUser(u: User) {
    u.Freeze = false;
    this.userService.editUser(u).subscribe(
      res => {
        if (res) {
          this.toast.success('User Unfreezed');
          this.getAllUsers();
        }
        else {
          this.toast.error('There was some error in unfreezing user');
        }
      },
      err => {
        this.toast.error('Everything is wrong');
      }
    );
  }

  freezeUser(u: User): void {
    u.Freeze = true;
    this.userService.editUser(u).subscribe(
      res => {
        if (res) {
          this.toast.success('User Freezed');
          this.getAllUsers();
        }
        else {
          this.toast.error('There was some error in Freezing user');
        }
      },
      err => {
        this.toast.error('Everything is wrong');
      }
    );
  }

  updateUser(u: User): void {
    this.router.navigate(['/edit-user', u.Id]);
  }
}