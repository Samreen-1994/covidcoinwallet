import { environment } from '../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Deal } from 'src/app/models/deal';
import { DealService } from 'src/app/services/deal.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-deal-center',
  templateUrl: './deal-center.component.html',
  styleUrls: ['./deal-center.component.css']
})
export class DealCenterComponent implements OnInit {
  deals = new Array<Deal>();
  imageBaseUrl = "";

  constructor(private dealService: DealService, private toast: ToastrService) { }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.fetchAllDeals();
  }

  fetchAllDeals() {
    this.dealService.getDeals().subscribe(
      data => {
        this.deals = data;
      },
      error => {
        this.toast.error("there was some error in fetching deals");
      }
    );
  }

}
