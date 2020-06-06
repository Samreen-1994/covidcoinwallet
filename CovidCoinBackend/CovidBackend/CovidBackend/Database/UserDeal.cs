using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CovidBackend.Database
{
    [Table("UserDeal")]
    public class UserDeal
    {
        [Key]
        public int? id { get; set; }
        public int? userId { get; set; }
        public int? dealId { get; set; }
        public double? dealPrice { get; set; }
        public string dealType { get; set; }
        public DateTime? createdAt { get; set; }
        public int? dealShares { get; set; }
        public bool isActive { get; set; }
    }
}