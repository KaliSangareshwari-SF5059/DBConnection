using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotelManagementAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;


namespace HotelManagementAPI.Controllers
{
    [ApiController]
    [Route("api/hotel/bookingdetailscontroller")]
    public class BookingDetailsController:ControllerBase
    {
      private readonly ApplicationDBContext _dbContext;
      public BookingDetailsController(ApplicationDBContext _db)
      {
        _dbContext=_db;
      }

      [HttpGet("bookings")]
      public IActionResult GetBookings()
      {
        return Ok (_dbContext.bookingDetails);
      }
      
      [HttpGet("get/bookings/{userid}")]
      public IActionResult GetBookingsDetails(int userid)
      {
        var bookings=_dbContext.bookingDetails.Where(booking=>booking.UserID==userid);
        if(bookings==null)
        {
            return NotFound();
        }
        return Ok(bookings);
      }
      [HttpGet("get/booking/{bookingid}")]
      public IActionResult GetBookingDetails(int bookingid)
      {
        var booking=_dbContext.bookingDetails.Find(bookingid);
        if(booking==null)
        {
            return NotFound();
        }
        return Ok(booking);
      }
      


      [HttpPost("add/newBooking/{totalPrice}/{userID}")]
      public IActionResult AddBookings([FromBody] BookingDetails booking,int totalPrice,int userID )
      {
        _dbContext.Add(booking);
        var user=_dbContext.users.Find(userID);
        user.Amount-=totalPrice;
        _dbContext.SaveChanges();
        
        return Ok(booking.BookingID);
      }
[HttpDelete("cancel/bookings/{bookingId}")]
      public IActionResult CancelBookings(int bookingId)
      {
        var booking= _dbContext.bookingDetails.Find(bookingId);
        if(booking==null)
        {
            return NotFound(bookingId);
        }
        var roomselection=_dbContext.selections.Where(bookings=>bookings.BookingID==booking.BookingID);
        foreach(var rooms in roomselection)
        {  
            rooms.BookingStatus=ApplicationDBContext.bookingStatusDetails[1];
        }
        booking.BookingStatus=ApplicationDBContext.bookingStatusDetails[1];
        var users = _dbContext.users.FirstOrDefault(user=>user.UserID==booking.UserID);
        users.Amount+=booking.TotalPrice;
        _dbContext.SaveChanges();
        return Ok(bookingId);
      }

    }
}