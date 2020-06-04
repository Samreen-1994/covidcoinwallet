import { UploadService } from './../../services/upload.service';
import { Component, OnInit } from '@angular/core';
import { Deal } from 'src/app/models/deal';
import { DealService } from 'src/app/services/deal.service';

@Component({
  selector: 'app-add-deal',
  templateUrl: './add-deal.component.html',
  styleUrls: ['./add-deal.component.css']
})
export class AddDealComponent implements OnInit {
  deal = new Deal();
  dealImage: string;

  constructor(private uploadService: UploadService, private dealService: DealService) { }

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
    debugger
    this.dealService.addDeal(this.deal).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

}
