using CovidBackend.Database;
using System;
using System.Collections.Generic;
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
    }
}