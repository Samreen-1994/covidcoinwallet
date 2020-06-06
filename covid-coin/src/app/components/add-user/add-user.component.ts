import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UploadService } from './../../services/upload.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user = new User();
  userAccountImage: string;

  constructor(private userService: UserService, private toast: ToastrService , private UploadService: UploadService) { }

  ngOnInit() {
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
      },
      error => {
        this.toast.error("There was some error in creating account");
      }
    );
  }

}
