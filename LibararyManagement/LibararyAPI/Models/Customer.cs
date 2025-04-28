using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibararyAPI.Models
{
    [Table("users", Schema = "public")]
    public class Customer
    {
        [Key]
        public int CustomerID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string UserPhoneNumber { get; set; }
        public string Gender { get; set; }
        public double Amount { get; set; }
        public string Department { get; set; }
    }
}