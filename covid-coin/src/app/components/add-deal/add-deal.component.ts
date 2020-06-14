import { UploadService } from './../../services/upload.service';
import { Component, OnInit } from '@angular/core';
import { Deal } from 'src/app/models/deal';
import { DealService } from 'src/app/services/deal.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-deal',
  templateUrl: './add-deal.component.html',
  styleUrls: ['./add-deal.component.css']
})
export class AddDealComponent implements OnInit {
  deal = new Deal();
  dealImage: string;

  constructor(private uploadService: UploadService, private dealService: DealService, private toast: ToastrService) { }

  ngOnInit() {
  }

  uploadFiles(e) {
    const frmData = new FormData();
    frmData.append("fileUpload", e.target.files[0]);

    this.uploadService.uploadImage(frmData).subscribe(
      data => {
        this.deal.Image = data as string;
      },
      error => {
        console.log(error);
      }
    );
  }

  saveDeal() {
    if ((!this.deal.Price || this.deal.Price < 0) || (!this.deal.StartLimit || this.deal.Price < 0) || (!this.deal.EndLimit || this.deal.Price < 0)) {
      this.toast.error('deal price and randomizer values should be greater than 0');
      return false;
    }
    else {
      this.dealService.addDeal(this.deal).subscribe(
        data => {
          if (data) {
            this.toast.success("deal added", "Success");
          }
        },
        error => {
          this.toast.error("there was some error in adding deal");
        }
      );
    }
  }
}
