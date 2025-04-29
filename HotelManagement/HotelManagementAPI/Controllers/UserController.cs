using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotelManagementAPI.Models;
using Microsoft.AspNetCore.Mvc;


namespace HotelManagementAPI.Controllers
{
    [ApiController]
    [Route("api/hotel/usercontroller/")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public UserController(ApplicationDBContext _db)
        {
            _dbContext = _db;
        }

        [HttpGet("{email}")]
        public IActionResult GetUser(string email)
        {
            var user = _dbContext.users.FirstOrDefault(user => user.Email == email.ToLower());
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        //adding new user
        [HttpPost("newUser/{user}")]
        public IActionResult AddNewUser([FromBody] User user)
        {
            // Generate a unique customer ID by incrementing an auto-incrementing ID

            _dbContext.users.Add(user);
            _dbContext.SaveChanges();
            return Ok(user.UserID); // Return the added customer to confirm
        }

        [HttpPut("recharge/{userID}/{amount}")]
        public IActionResult RechargeWalletBalance(int userID, double amount)
        {
            var user = _dbContext.users.FirstOrDefault(user => user.UserID == userID);
            if (user == null)
            {
                return NotFound();
            }
            user.Amount += amount;
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}