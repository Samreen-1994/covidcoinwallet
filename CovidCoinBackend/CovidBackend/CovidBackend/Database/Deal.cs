using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CovidBackend.Database
{
    [Table("Deals")]
    public class Deal
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool IsActive { get; set; }
        public DateTime? CreatedAt { get; set; }
        public double? StartLimit { get; set; }
        public double? EndLimit { get; set; }
        public string Image { get; set; }
        public double ClosingPrice { get; set; }
        public DateTime? ClosingDate { get; set; }
        public long? ClosingTimeCount { get; set; }
        [NotMapped]
        public bool isDealBought { get; set; }
    }
}