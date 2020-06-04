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
            using (CovidCoinContext covidCoinEntities = new CovidCoinContext())
            {
                covidCoinEntities.Deals.Add(d);
                covidCoinEntities.SaveChanges();
                return true;
            }
        }
    }
}