import { User } from 'src/app/models/user';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-leverage',
  templateUrl: './leverage.component.html',
  styleUrls: ['./leverage.component.css']
})
export class LeverageComponent implements OnInit {
  leverageId: number = 1;
  loggedUser: User;
  disabledButton: boolean = false;
  constructor(private userService: UserService, private toast: ToastrService) { }

  ngOnInit() {
    this.loggedUser = JSON.parse(sessionStorage.getItem('user'));
    this.CheckLeverageCount();
  }

  updateUserLeverage() {
    this.userService.UpdateLeverage(this.leverageId, this.loggedUser.Id).subscribe(
      data => {
        if (data) {
          this.toast.success("Leverage Updated");
          this.userService.refreshUserDetails();
        }
      },
      error => {
        this.toast.error("There was an error while updating leverage");
      }
    );
  }

  CheckLeverageCount(){

    this.userService.CheckLeverageCount(this.loggedUser.Id).subscribe(
      data => {
        if (data > 0 ) {
        this.disabledButton=true;
        }
      },
      error => {
        this.toast.error("There was an error while updating leverage");
      }

    );
  }
}
