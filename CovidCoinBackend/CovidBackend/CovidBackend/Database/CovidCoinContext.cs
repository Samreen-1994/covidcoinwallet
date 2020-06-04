using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace CovidBackend.Database
{
    public class CovidCoinContext : DbContext
    {
        public CovidCoinContext() : base(ConfigurationManager.ConnectionStrings["CovidConnection"].ToString())
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Deal> Deals { get; set; }
    }
}