using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcommerceAPI.Models;
 [Table("orders", Schema = "public")]
public class Order
{
    [Key]
    public int OrderID { get; set; }
    public int ProductID { get; set; }
    public string ProductName { get; set; }
    public int CustomerID { get; set; }
    public double TotalPrice { get; set; }
    public int ProductCount { get; set; }
    public string PurchaseStatus { get; set; }
    public DateTime OrderDate { get; set; }

}