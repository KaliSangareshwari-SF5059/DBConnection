using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotelManagementAPI.Models;
using Microsoft.AspNetCore.Mvc;


namespace HotelManagementAPI.Controllers
{
    [ApiController]
    [Route("api/hotel/roomselectioncontroller")]
    public class RoomSelectionController : ControllerBase
    {

        private readonly ApplicationDBContext _dbContext;
        public RoomSelectionController(ApplicationDBContext _db)
        {
            _dbContext = _db;
        }

        [HttpGet("selections")]
        public IActionResult GetSelections()
        {
            return Ok(_dbContext.selections);
        }

        [HttpGet("get/selections/{userid}")]
        public IActionResult GetSelectionsDetails(int userid)
        {
            var selections = _dbContext.selections.Find(userid);
            if (selections == null)
            {
                return NotFound();
            }
            return Ok(selections);
        }
        [HttpPost("add/newSelections")]
      public IActionResult AddBookings(RoomSelection selection)
      {
        _dbContext.Add(selection);
        _dbContext.SaveChanges();
        return Ok();
      }
    }
}