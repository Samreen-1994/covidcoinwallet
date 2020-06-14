import { UserService } from './../../services/user.service';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-supervisor',
  templateUrl: './add-supervisor.component.html',
  styleUrls: ['./add-supervisor.component.css']
})
export class AddSupervisorComponent implements OnInit {
  supervisor = new User();
  isEdit: boolean = false;

  constructor(private userService: UserService, private toast: ToastrService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getSupervisorById(parseInt(id));
      this.isEdit = true;
    }
    else {
      this.supervisor = new User();
      this.isEdit = false;
    }
  }

  getSupervisorById(id: number) {
    this.userService.findUserById(id).subscribe(
      data => {
        this.supervisor = data;
      },
      error => {
        this.toast.error('there was some error while fetching supervisor');
      }
    );
  }

  createSupervisor() {
    this.supervisor.Role = 3;
    this.supervisor.IsActive = true;
    this.supervisor.Freeze = false;
    this.userService.addSupervisor(this.supervisor).subscribe(
      data => {
        if (data) {
          this.toast.success('supervisor added successfully!');
        }
      },
      err => {
        this.toast.error('there was an error in adding supervisor');
      }
    );
  }

  editSupervisor() {
    this.userService.editSupervisor(this.supervisor).subscribe(
      data => {
        this.toast.success('supervisor updated');
      },
      error => {
        this.toast.error('there was an error in freezing supervisor');
      }
    );
  }
}
