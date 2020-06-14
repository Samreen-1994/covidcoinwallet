import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UploadService } from './../../services/upload.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user = new User();
  userAccountImage: string;
  isEdit: boolean = false;

  constructor(private userService: UserService, private toast: ToastrService, private UploadService: UploadService, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getUserById(parseInt(id));
      this.isEdit = true;
    }
    else {
      this.user = new User();
      this.isEdit = false;
    }
  }

  getUserById(id: number) {
    this.userService.findUserById(id).subscribe(
      data => {
        this.user = data;
      },
      error => {
        this.toast.error('there was some error while fetching supervisor');
      }
    );
  }

  uploadFiles(e) {
    const formData = new FormData();
    formData.append("fileUpload", e.target.files[0]);

    this.UploadService.uploadImage(formData).subscribe(
      data => {
        this.user.Image = data as string;
      },
      error => {
        console.log(error);
      }
    );
  }

  saveAccount() {
    this.user.Role = 2;
    this.user.IsActive = true;
    this.userService.addUser(this.user).subscribe(
      data => {
        if (data) {
          this.toast.success("Account created", "Success");
        }
        else {
          this.toast.warning('User having same Username,Email,Phone or Address already exists');
        }
      },
      error => {
        this.toast.error("There was some error in creating account");
      }
    );
  }

  editUser() {
    this.userService.editUser(this.user).subscribe(
      data => {
        this.toast.success('user updated');
      },
      error => {
        this.toast.error('there was an error in freezing supervisor');
      }
    );
  }
}
