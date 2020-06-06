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
  constructor(private userService: UserService, private toast: ToastrService) { }

  ngOnInit() {
  }

  updateUserLeverage() {
    this.userService.UpdateLeverage(this.leverageId, this.userService.loggedInUser.Id).subscribe(
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
}
