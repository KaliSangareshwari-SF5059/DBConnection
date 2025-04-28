using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcommerceAPI.Models;
 [Table("customers", Schema = "public")]
public class Customer
{
   
    [Key]
    public int CustomerID { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string UserPhoneNumber { get; set; }
    public double Amount { get; set; }
    public string City { get; set; }
}