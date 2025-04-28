using LibararyAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace LibararyAPI.Controllers
{
    public class ApplicationDBContext : DbContext
    {
        public static List<string> genderDetails = new List<string>(){"Male","Female","Others"};
        public static List<string> departmentDetails= new List<string>(){"CSE","EEE","ECE"};
        
        public static List<string> availabityDetails = new List<string>() { "Issued", "Available","Damaged" };
       
        public static List<string> borrowStatus = new List<string>() { "Borrowed", "Returned" };
 public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }
        public DbSet<Customer> users{get;set;}
        public DbSet<BookDetails> books {get;set;}
        public DbSet<Borrow> borrows{get;set;}
    }
}