using EcommerceAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EcommerceAPI.Controllers
{
    public class ApplicationDBContext: DbContext
    {
         public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }
        //Application data
        public DbSet<Customer> users { get; set; }
        public DbSet<Order> orders{get;set;}
        public DbSet<ProductInfo> products {get;set;}
        public static List<string> orderStatus = new List<string>() { "Purchased", "Cancelled" };

    }
}