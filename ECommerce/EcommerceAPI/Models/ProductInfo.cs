using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace EcommerceAPI.Models
{
     [Table("productinfo", Schema = "public")]
    public class ProductInfo
    {
        [Key]
        public int ProductID { get; set; }
        public string ProductName { get; set; }
        public int ProductCount { get; set; }
        public int ProductPrice { get; set; }
        public int ShippingDuration { get; set; }
    }
}
