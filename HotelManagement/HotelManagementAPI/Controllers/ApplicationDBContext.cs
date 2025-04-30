using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using HotelManagementAPI.Models;

namespace HotelManagementAPI.Controllers
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }

        public static List<string> foodTypeDetails = new List<string>() { "Veg", "Non Veg" };
        public static List<string> genderDetails = new List<string>() { "Male", "Female", "Others" };

        public static List<string> roomTypeDetails = new List<string>() { "Standard", "Delux", "Suit" };
        public static List<string> bookingStatusDetails = new List<string>() { "Booked", "Cancelled" };

        public DbSet<User> users { get; set; }
        public DbSet<WishList> wishlists { get; set; }
        public DbSet<RoomDetails> roomDetails { get; set; }
        public DbSet<RoomSelection> selections { get; set; }
        public DbSet<BookingDetails> bookingDetails { get; set; }

    }
}