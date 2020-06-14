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
                return covidCoinEntities.Users.Where(x => x.IsActive == true).ToList();
            }
        }

        public bool AddUser(User user)
        {
            using (CovidCoinContext covidCoinEntities = new CovidCoinContext())
            {
                var getCurrentUser = covidCoinEntities.Users.Where(x => x.Role == 2 &&
                (x.Username.Equals(user.Username) || x.Email.Equals(user.Email) || x.Phone == user.Phone || x.Address.Equals(user.Address))
                && x.IsActive == true).FirstOrDefault();


                if (getCurrentUser != null)
                {
                    return false;
                }
                else
                {
                    covidCoinEntities.Users.Add(user);
                    covidCoinEntities.SaveChanges();
                    return true;
                }
            }
        }

        public User EditUser(User user)
        {
            using (CovidCoinContext covid = new CovidCoinContext())
            {
                var findUser = covid.Users.Where(x => x.Id == user.Id && x.IsActive == true).FirstOrDefault();
                if (user.IsActive == false)
                {
                    findUser.IsActive = false;
                }
                if (user.Freeze == true)
                {
                    findUser.Freeze = true;
                }
                else
                {
                    findUser.Freeze = false;
                }

                if (user.IsActive == true && user.Freeze == false)
                {
                    findUser.Name = user.Name;
                    findUser.Username = user.Username;
                    findUser.Password = user.Password;
                    findUser.Balance = user.Balance;
                    findUser.Email = user.Email;
                    findUser.Phone = user.Phone;
                }

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