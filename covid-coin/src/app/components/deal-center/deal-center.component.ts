import { UserService } from './../../services/user.service';
import { BuyDealModel, CloseDealInput } from './../../models/deal';
import { Observable, timer } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { Deal } from 'src/app/models/deal';
import { DealService } from 'src/app/services/deal.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-deal-center',
  templateUrl: './deal-center.component.html',
  styleUrls: ['./deal-center.component.css']
})
export class DealCenterComponent implements OnInit, OnChanges {
  deals = new Array<Deal>();
  imageBaseUrl = "";

  currTime: number;
  obsTimer: Observable<number> = timer(2000, 2000);

  selectedDeal = new Deal();
  buyDealQuantity: number = 0;

  buyDealModel = new BuyDealModel();

  constructor(private dealService: DealService, private toast: ToastrService, public userService: UserService) { }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.fetchAllDeals();

    this.obsTimer.subscribe(currTime => {
      this.currTime = currTime;
      let temp = this.deals;
      temp.forEach(d => {
        if (!d.dealOrignalPrice) {
          d.dealOrignalPrice = d.Price;
        }

        let randomStart = d.StartLimit;
        let randomEnd = d.EndLimit;
        let randomPrice = (Math.floor(Math.random() * randomEnd) + randomStart) * d.dealOrignalPrice;
        if (randomPrice != 0.00) {
          d.Price = randomPrice;
        }
      });
      this.deals = temp;
    });
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

  buyDeal() {
    this.buyDealModel.dealId = this.selectedDeal.Id;
    this.buyDealModel.userId = 1;
    this.buyDealModel.dealShares = this.buyDealQuantity;
    this.buyDealModel.dealPrice = parseFloat(this.selectedDeal.Price.toFixed(2));

    this.dealService.buyDeal(this.buyDealModel).subscribe(
      data => {
        this.toast.success("deal bought");
      },
      error => {
        this.toast.error("error");
      }
    );

    this.hide();
  }

  showModal: boolean;
  //Bootstrap Modal Open event
  show(d) {
    this.selectedDeal = d;
    this.showModal = true; // Show-Hide Modal Check
  }
  //Bootstrap Modal Close event
  hide() {
    this.showModal = false;
  }


  closeDeal(d: Deal) {
    debugger
    var closeDealInput = new CloseDealInput();
    closeDealInput.dealId = d.Id;
    closeDealInput.closingPrice = d.Price;
    closeDealInput.userId = this.userService.loggedInUser.Id;

    this.dealService.closeDeal(closeDealInput).subscribe(
      data => {
        if (data) {
          this.toast.success("deal closed");
          this.userService.refreshUserDetails();
        }
        else {
          this.toast.error("error in closing deal");
        }
      },
      error => {
        this.toast.error("error in closing deal");
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
  }
}
