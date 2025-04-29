using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotelManagementAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


namespace HotelManagementAPI.Controllers
{

    [ApiController]
    [Route("api/hotel/roomdetailscontroller")]
    public class RoomDetailsController:ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;

        public RoomDetailsController(ApplicationDBContext _db)
        {
            _dbContext=_db;
        }

        [HttpGet("rooms")]
        public IActionResult GetRooms()
        {
            return Ok(_dbContext.roomDetails);
        }

        [HttpGet("get/room/{roomId}")]
        public IActionResult GetRoomDetails(int roomId)
        {
            var room = _dbContext.roomDetails.Find(roomId);
            if(room==null)
            {
                return NotFound();
            }
            return Ok(room);
        }

        [HttpPost("add/newRoom")]
        public IActionResult AddNewRoom([FromBody] RoomDetails room)
        {
            _dbContext.roomDetails.Add(room);
            _dbContext.SaveChanges();
            return Ok(room.RoomID);
        }

        [HttpPut("edit/room")]
        public IActionResult EditRoom(RoomDetails roomData)
        {
            var room = _dbContext.roomDetails.Find(roomData.RoomID);
            if(room == null)
            {
                return NotFound();
            }
            room.RoomType=roomData.RoomType;
            room.NumberOfBeds=roomData.NumberOfBeds;
            room.PricePerDay=roomData.PricePerDay;
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpDelete("delete/room/{roomID}")]
        public IActionResult DeleteRoom(int roomID)
        {
            var room= _dbContext.roomDetails.Find(roomID);
            if(room==null)
            {
                return NotFound();
            }
            _dbContext.roomDetails.Remove(room);
            _dbContext.SaveChanges();
            return Ok();
            
        }

    }
}