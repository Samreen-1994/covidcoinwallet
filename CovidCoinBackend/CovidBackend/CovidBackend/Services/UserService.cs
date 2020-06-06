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

        public User EditUser(User user)
        {
            using (CovidCoinContext covid = new CovidCoinContext())
            {
                var findUser = covid.Users.Where(x => x.Id == user.Id && x.IsActive == true).FirstOrDefault();
                findUser.Name = user.Name;
                findUser.Username = user.Name;
                findUser.IsActive = user.IsActive;
                findUser.Password = user.Password;
                findUser.Balance = user.Balance;
                findUser.Email = user.Email;
                findUser.Freeze = user.Freeze;
                findUser.Phone = user.Phone;

                covid.Entry(findUser).State = EntityState.Modified;
                covid.SaveChanges();
                return findUser;
            }
        }

        public User LoginUser(string userName, string password)
        {
            using (CovidCoinContext covidCoinEntities = new CovidCoinContext())
            {
                return covidCoinEntities.Users.Where(x => x.Username.Equals(userName) && x.Password.Equals(password) && x.IsActive == true).FirstOrDefault();
            }
        }

        public User GetUserById(int userId)
        {
            using (CovidCoinContext covidCoinEntities = new CovidCoinContext())
            {
                return covidCoinEntities.Users.Where(x => x.Id == userId && x.IsActive == true).FirstOrDefault();
            }
        }
    }
}