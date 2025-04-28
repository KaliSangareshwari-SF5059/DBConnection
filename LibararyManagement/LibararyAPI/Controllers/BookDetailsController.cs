using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LibararyAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace LibararyAPI.Controllers
{
    [ApiController]
    [Route("api/libarary/bookscontroller")]
    public class BookDetailsController : ControllerBase
    {
          private readonly ApplicationDBContext _dbContext;
      public BookDetailsController(ApplicationDBContext _db)
    {
        _dbContext= _db;
    }
    

        [HttpGet("books")]
        public IActionResult GetBooks()
        {
            return Ok(_dbContext.books);
        }

        //getting the product
        [HttpGet("get/book/{bookId}")]
        public IActionResult GetbookDetail(int bookId)
        {
            var book = _dbContext.books.Find(bookId);
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }

        //Adding new product
        [HttpPost("add/newBook")]
        public IActionResult AddNewBook([FromBody] BookDetails book)
        {
            
            _dbContext.books.Add(book);
            _dbContext.SaveChanges();
            return Ok(book.BookID);
        }

        //checking if the product already exists
        [HttpGet("book/{bookName}")]
        public IActionResult GetBookExist(string bookName)
        {
            bool isProductValid = _dbContext.books.Any(book => book.BookName.ToLower() == bookName.ToLower());
            return Ok(isProductValid);
        }

        [HttpPut("new/book/edit")]
        public IActionResult EditProduct(BookDetails bookData)
        {
            var book = _dbContext.books.Find(bookData.BookID);
            if (book == null)
            {
                return NotFound();
            }
            book.BookName = bookData.BookName;
            book.AuthorName=bookData.AuthorName;
            book.Availability=bookData.Availability;
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpDelete("delete/{bookID}")]
        public IActionResult DeleteBook(int bookID)
        {
            var book = _dbContext.books.Find(bookID);
            if (book == null)
            {
                return NotFound();
            }
            _dbContext.books.Remove(book);
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}