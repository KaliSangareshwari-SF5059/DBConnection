using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LibararyAPI.Models;
using Microsoft.AspNetCore.Mvc;
namespace LibararyAPI.Controllers
{
    [ApiController]
    [Route("api/libarary/usercontroller/")]
    public class CustomerController:ControllerBase
    {

          private readonly ApplicationDBContext _dbContext;
      public CustomerController(ApplicationDBContext _db)
    {
        _dbContext= _db;
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
        public IActionResult AddNewUser([FromBody] Customer user)
        {
            // Generate a unique customer ID by incrementing an auto-incrementing ID

            _dbContext.users.Add(user);
            _dbContext.SaveChanges();
            return Ok(user.CustomerID); // Return the added customer to confirm
        }

        [HttpPut("recharge/{userID}/{amount}")]
        public IActionResult RechargeWalletBalance(int userID, double amount)
        {
            var user = _dbContext.users.FirstOrDefault(user => user.CustomerID == userID);
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