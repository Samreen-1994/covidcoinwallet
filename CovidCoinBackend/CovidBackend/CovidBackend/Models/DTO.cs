using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CovidBackend.Models
{
    public class BuyDealModel
    {
        public int dealId { get; set; }
        public int userId { get; set; }
        public long dealPrice { get; set; }
        public int dealShares { get; set; }
    }

    public class LeverageInput
    {
        public int leverageId { get; set; }
        public int userId { get; set; }
    }

    public class CloseDealInput
    {
        public int dealId { get; set; }
        public double closingPrice { get; set; }
        public int userId { get; set; }
        public string dealClosingType { get; set; }
    }
}
