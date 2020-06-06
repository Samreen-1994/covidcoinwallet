using CovidBackend.Database;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace CovidBackend.Services
{
    public class LeverageService
    {
        public bool UpdateLeverage(int levergae, int userId)
        {
            using (CovidCoinContext c = new CovidCoinContext())
            {
                var findUser = c.Users.Where(i => i.Id == userId).FirstOrDefault();
                findUser.LeverageId = levergae;

                if (levergae == 1)
                {
                    findUser.LeverageBalance = findUser.Balance * 50;
                }
                else if (levergae == 2)
                {
                    findUser.LeverageBalance = findUser.Balance * 100;
                }
                else if (levergae == 2)
                {
                    findUser.LeverageBalance = findUser.Balance * 500;
                }

                c.Entry(findUser).State = EntityState.Modified;
                c.SaveChanges();
                return true;
            }
        }
    }
}