﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CovidBackend.Database
{
    [Table("Users")]
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public int Role { get; set; }
        public int Createdby { get; set; }
        public float Balance { get; set; }
        public bool Freeze { get; set; }
        public int LeverageId { get; set; }
        public string IdentityDocument { get; set; }
        public float LeverageBalance { get; set; }
    }
}