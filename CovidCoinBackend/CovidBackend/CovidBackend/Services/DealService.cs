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

        public List<Deal> GetAllDeals()
        {
            using (CovidCoinContext covidCoinEntities = new CovidCoinContext())
            {
                return covidCoinEntities.Deals.Where(x => x.IsActive == true).ToList();
            }
        }

        public bool BuyDeal(BuyDealModel buyDealModel)
        {
            using (CovidCoinContext covidCoinEntities = new CovidCoinContext())
            {
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
            }
            return true;
        }

        public bool CloseDeal(CloseDealInput closeDealInput)
        {
            //profit / loss of the user = (Closing price – buy price) x quantity of the same deal.

            using (CovidCoinContext covidCoinEntities = new CovidCoinContext())
            {
                var user = covidCoinEntities.Users.Where(x => x.Id == closeDealInput.userId && x.IsActive == true).FirstOrDefault();
                var deal = covidCoinEntities.Deals.Where(d => d.Id == closeDealInput.dealId && d.IsActive == true).FirstOrDefault();
                var userDeal = covidCoinEntities.UserDeals.Where(ud => ud.dealId == deal.Id && ud.userId == closeDealInput.userId).FirstOrDefault();

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
                    user.Balance = user.Balance - profitLoss;
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

                covidCoinEntities.Entry(user).State = EntityState.Modified;
                covidCoinEntities.Entry(deal).State = EntityState.Modified;
                covidCoinEntities.SaveChanges();
                return true;
            }
        }
    }
}