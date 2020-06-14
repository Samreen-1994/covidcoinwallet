using CovidBackend.Database;
using CovidBackend.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace CovidBackend.Services
{
    public class DealService
    {
        public bool AddDeal(Deal d)
        {
            d.IsActive = true;
            d.CreatedAt = DateTime.Now;
            using (CovidCoinContext covidCoinEntities = new CovidCoinContext())
            {
                covidCoinEntities.Deals.Add(d);
                covidCoinEntities.SaveChanges();
                return true;
            }
        }

        public List<Deal> GetAllDeals(int userId)
        {
            using (CovidCoinContext covidCoinEntities = new CovidCoinContext())
            {
                var deals = covidCoinEntities.Deals.Where(x => x.IsActive == true).ToList();
                foreach (var deal in deals)
                {
                    var d = covidCoinEntities.UserDeals.Where(x => x.userId == userId && x.dealId == deal.Id && x.isActive == true).FirstOrDefault();
                    if (d != null)
                    {
                        deal.isDealBought = true;
                    }
                    else
                    {
                        deal.isDealBought = false;
                    }
                }
                return deals;
            }
        }

        public bool BuyDeal(BuyDealModel buyDealModel)
        {
            using (CovidCoinContext covidCoinEntities = new CovidCoinContext())
            {
                var dealBought = covidCoinEntities.UserDeals.Where(x => x.userId == buyDealModel.userId && x.dealId == buyDealModel.userId && x.dealType.Equals("buy") && x.isActive == true).FirstOrDefault();
                if (dealBought != null)
                {
                    return false;
                }
                else
                {
                    var user = covidCoinEntities.Users.Where(x => x.Id == buyDealModel.userId && x.IsActive == true).FirstOrDefault();
                    user.LeverageBalance = user.LeverageBalance - buyDealModel.dealPrice * buyDealModel.dealShares;
                    covidCoinEntities.Entry(user).State = EntityState.Modified;

                    UserDeal deal = new UserDeal();
                    deal.dealId = buyDealModel.dealId;
                    deal.userId = buyDealModel.userId;
                    deal.dealShares = buyDealModel.dealShares;
                    deal.dealPrice = buyDealModel.dealPrice;
                    deal.dealType = "buy";
                    deal.isActive = true;
                    deal.createdAt = DateTime.Now;

                    covidCoinEntities.UserDeals.Add(deal);
                    covidCoinEntities.SaveChanges();
                    return true;
                }
            }
        }

        public bool CloseDeal(CloseDealInput closeDealInput)
        {
            //profit / loss of the user = (Closing price – buy price) x quantity of the same deal.

            using (CovidCoinContext covidCoinEntities = new CovidCoinContext())
            {
                var user = covidCoinEntities.Users.Where(x => x.Id == closeDealInput.userId && x.IsActive == true).FirstOrDefault();
                var deal = covidCoinEntities.Deals.Where(d => d.Id == closeDealInput.dealId && d.IsActive == true).FirstOrDefault();
                var userDeal = covidCoinEntities.UserDeals.Where(ud => ud.dealId == deal.Id && ud.userId == closeDealInput.userId && ud.isActive == true).FirstOrDefault();

                //calculating profit/loss
                deal.ClosingPrice = closeDealInput.closingPrice;
                var profitLoss = (deal.ClosingPrice - userDeal.dealPrice) * userDeal.dealShares;

                //updating wallet
                if (deal.ClosingPrice > userDeal.dealPrice)
                {
                    user.Balance = user.Balance + profitLoss;
                }
                else
                {
                    if (profitLoss < 0)
                    {
                        user.Balance = user.Balance + profitLoss;
                    }
                    else
                    {
                        user.Balance = user.Balance - profitLoss;
                    }

                }

                //updating leverage wallet
                if (user.LeverageId == 1)
                {
                    user.LeverageBalance = user.Balance * 50;
                }
                else if (user.LeverageId == 2)
                {
                    user.LeverageBalance = user.Balance * 100;
                }
                else if (user.LeverageId == 2)
                {
                    user.LeverageBalance = user.Balance * 500;
                }

                userDeal.isActive = false;

                covidCoinEntities.Entry(user).State = EntityState.Modified;
                covidCoinEntities.Entry(deal).State = EntityState.Modified;
                covidCoinEntities.Entry(userDeal).State = EntityState.Modified;
                covidCoinEntities.SaveChanges();
                return true;
            }
        }
    }
}