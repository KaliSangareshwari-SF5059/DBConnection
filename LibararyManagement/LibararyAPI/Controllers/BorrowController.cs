using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LibararyAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace LibararyAPI.Controllers
{
    [ApiController]
    [Route("api/libarary/borrowcontroller/")]
    public class Borrowcontroller : ControllerBase
    {

        private readonly ApplicationDBContext _dbContext;
        public Borrowcontroller(ApplicationDBContext _db)
        {
            _dbContext = _db;
        }


        [HttpGet("borrowHistory")]
        public IActionResult GetBorrows()
        {
            return Ok(_dbContext.borrows);
        }

        //getting the order
        [HttpGet("get/borrow/{borrowID}")]
        public IActionResult GetBorrowDetail(int borrowID)
        {
            var borrow = _dbContext.borrows.FirstOrDefault(order => order.BorrowID == borrowID);
            if (borrow == null)
            {
                return NotFound();
            }
            return Ok(borrow);
        }

        //Adding new product
        [HttpPost("add/newBorrow/{userID}/{bookID}")]
        public IActionResult AddNewMedicine(int userID, int bookID)
        {
            var book = _dbContext.books.FirstOrDefault(book => book.BookID == bookID);
            if (book == null)
            {
                Console.WriteLine("Book not found");
                return NotFound();
            }
            var user = _dbContext.users.FirstOrDefault(user => user.CustomerID == userID);
            if (user == null)
            {
                Console.WriteLine("User not found");
                return BadRequest("User not found");
            }

            Borrow borrow = new Borrow() { BookID = bookID, BookName = book.BookName, CustomerID = userID, BookingStatus = ApplicationDBContext.borrowStatus[0], BorrowDate = DateTime.Now };
            _dbContext.borrows.Add(borrow);
            book.Availability = ApplicationDBContext.availabityDetails[0];
            _dbContext.SaveChanges();
            return Ok(borrow.BorrowID);
        }

        [HttpPut("cancel/{userID}/{borrowID}/{fineAmount}/{bookID}")]
        public IActionResult CancelOrder(int userID, int borrowID, int fineAmount, int bookID)
        {

            var borrow = _dbContext.borrows.FirstOrDefault(order => order.BorrowID == borrowID && order.CustomerID == userID);
            if (borrow == null)
            {
                return NotFound();
            }
            if (borrow.BookingStatus == ApplicationDBContext.borrowStatus[1])
            {
                return BadRequest("Book already returned");
            }
            var book = _dbContext.books.FirstOrDefault(book => book.BookID == bookID);
            borrow.BookingStatus = ApplicationDBContext.borrowStatus[1];
            book.Availability = ApplicationDBContext.availabityDetails[1];
            borrow.FineAmount = fineAmount;
            var user = _dbContext.users.FirstOrDefault(user => user.CustomerID == userID);
            user.Amount -= fineAmount;
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}