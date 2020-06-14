import { UserService } from './../../services/user.service';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-supervisors',
  templateUrl: './show-supervisors.component.html',
  styleUrls: ['./show-supervisors.component.css']
})
export class ShowSupervisorsComponent implements OnInit {
  supervisorList = new Array<User>();
  
  constructor(private userService: UserService, private toast: ToastrService, private router: Router) { }

  ngOnInit() {
    this.getSupervisors();
  }

  getSupervisors() {
    this.userService.fetchSupervisors().subscribe(
      data => {
        this.supervisorList = data;
        this.supervisorList = this.supervisorList.filter(x => x.Role == 3);
      },
      error => {
        this.toast.error('there was an error in fetching supervisors');
      }
    );
  }

  deleteSupervisor(s: User) {
    s.IsActive = false;
    this.userService.editSupervisor(s).subscribe(
      data => {
        this.toast.success('supervisor deleted');
        this.getSupervisors();
      },
      error => {
        this.toast.error('there was an error in deleting supervisor');
      }
    );
  }

  editSupervisor(s: User) {
    this.router.navigate(['/edit-supervisor', s.Id]);
  }

  freezeSupervisor(s: User) {
    s.Freeze = true;
    this.userService.editSupervisor(s).subscribe(
      data => {
        this.toast.success('supervisor freezed');
        this.getSupervisors();
      },
      error => {
        this.toast.error('there was an error in freezing supervisor');
      }
    );
  }

  unfreezeSupervisor(s: User) {
    s.Freeze = false;
    this.userService.editSupervisor(s).subscribe(
      data => {
        this.toast.success('supervisor unfreezed');
        this.getSupervisors();
      },
      error => {
        this.toast.error('there was an error in freezing supervisor');
      }
    );
  }
}
