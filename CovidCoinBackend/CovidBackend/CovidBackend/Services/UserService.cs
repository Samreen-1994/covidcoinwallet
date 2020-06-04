using CovidBackend.Database;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace CovidBackend.Services
{
    public class UserService
    {
        public List<User> GetAllUser()
        {
            using (CovidCoinContext covidCoinEntities = new CovidCoinContext())
            {
                return covidCoinEntities.Users.ToList();
            }
        }

        public bool AddUser(User user)
        {
            using (CovidCoinContext covidCoinEntities = new CovidCoinContext())
            {
                covidCoinEntities.Users.Add(user);
                covidCoinEntities.SaveChanges();
                return true;
            }
        }

        public User LoginUser(string userName, string password)
        {
            using (CovidCoinContext covidCoinEntities = new CovidCoinContext())
            {
                return covidCoinEntities.Users.Where(x => x.Username.Equals(userName) && x.Password.Equals(password)).FirstOrDefault();
            }
        }
    }
}