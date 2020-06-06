import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {
  user= new Array<User>();

constructor(private userService: UserService, private toast: ToastrService ) { }

  ngOnInit() {
    this.getAllUsers(); 
  }

  getAllUsers(): void {
    this.userService.getAllUser().subscribe(
      res => {
        this.user = res;
      },
      err => {
        this.toast.error('Everything is broken');
      }
    )
  }
  deleteUser(u: User): void {
    var user = new User();
    user.Id = u.Id;
    user.IsActive = false;

    this.userService.editUser(user).subscribe(
      res => {
        if (res == true) {
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

  freezeUser(u: User): void {
    var user = new User();
    user.Id = u.Id;
    user.Freeze = false;

    this.userService.editUser(user).subscribe(
      res => {
        if (res == true) {
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
    this.userService.editUser(u).subscribe(
      res => {
        if (res == true) {
          this.toast.success('Successfully edit');
          this.getAllUsers();
          u.isedit = false;
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




}