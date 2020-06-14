import { User } from 'src/app/models/user';
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
  obsTimer: Observable<number> = timer(1000, 1000);

  selectedDeal = new Deal();
  buyDealQuantity: number = 0;

  buyDealModel = new BuyDealModel();

  loggedUser: User;

  constructor(private dealService: DealService, private toast: ToastrService, public userService: UserService) { }

  randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  ngOnInit() {
    this.loggedUser = JSON.parse(sessionStorage.getItem('user'));
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
        let randomPrice = this.randomNumber(randomStart, randomEnd);
        randomPrice = randomPrice * d.dealOrignalPrice;
        if (randomPrice != 0.00) {
          d.Price = randomPrice;
        }
      });
      this.deals = temp;
    });
  }




  fetchAllDeals() {
    this.dealService.getDeals(this.loggedUser.Id).subscribe(
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
    this.buyDealModel.userId = this.loggedUser.Id;
    this.buyDealModel.dealShares = this.buyDealQuantity;
    this.buyDealModel.dealPrice = this.selectedDeal.Price;

    var dealLeverage = this.selectedDeal.Price * this.buyDealQuantity;
    if (this.loggedUser.LeverageBalance < dealLeverage) {
      this.toast.warning("deal cannot be bought as you dont have enough deal balance");
    }
    else {
      this.loggedUser.LeverageBalance = this.loggedUser.LeverageBalance - this.selectedDeal.Price * this.buyDealQuantity;
      this.dealService.buyDeal(this.buyDealModel).subscribe(
        data => {
          if (data == true) {
            this.toast.success("deal opened and bought");
            this.fetchAllDeals();
          }
          else {
            this.toast.warning('deal already opened');
          }
        },
        error => {
          this.toast.error("error");
        }
      );

    }
    this.hide();
  }

  showModal: boolean;
  show(d) {
    this.selectedDeal = d;
    this.showModal = true;
  }

  hide() {
    this.showModal = false;
  }


  closeDeal(d: Deal) {
    debugger
    var closeDealInput = new CloseDealInput();
    closeDealInput.dealId = d.Id;
    closeDealInput.closingPrice = d.Price;
    closeDealInput.userId = this.loggedUser.Id;

    this.dealService.closeDeal(closeDealInput).subscribe(
      data => {
        if (data) {
          this.toast.success("deal closed");
          this.userService.refreshUserDetails();
          this.fetchAllDeals();
          this.loggedUser = JSON.parse(sessionStorage.getItem('user'));
          this.userService.loggedInUser = this.loggedUser;
          this.userService.updateNavigationBarWallet();
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
