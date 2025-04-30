using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotelManagementAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace HotelManagementAPI.Controllers
{
    [ApiController]
    [Route("api/hotel/wishlistcontroller")]
    public class WishListController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;

        public WishListController(ApplicationDBContext _db)
        {
            _dbContext = _db;
        }



        [HttpGet("availablewishlists")]
        public IActionResult GetAvailableWishList()
        {

            var availableWish = _dbContext.wishlists
             .Where(wish => !_dbContext.selections
             .Any(room => room.RoomID == wish.RoomID
             && room.BookingStatus != ApplicationDBContext.bookingStatusDetails[1]
             && ((wish.FromDate >= room.StayingFrom && wish.FromDate <= room.StayingTo)
             || (wish.ToDate >= room.StayingFrom && wish.ToDate <= room.StayingTo)
             || (wish.FromDate <= room.StayingFrom && wish.ToDate >= room.StayingTo))))
             .ToList();

            return Ok(availableWish);

           
        }

        [HttpGet("get/wishlists/{userId}")]
        public IActionResult GetWishListDetail(int userId)
        {
            var wishlist = _dbContext.wishlists.Where(wishlists => wishlists.UserID == userId);
            if (wishlist == null)
            {
                return NotFound();
            }
            return Ok(wishlist);
        }

        [HttpGet("get/wishlist/{wishlistID}")]
        public IActionResult GetWishListsDetail(int wishlistID)
        {
            var wishlist = _dbContext.wishlists.Find(wishlistID);
            if (wishlist == null)
            {
                return NotFound();
            }
            return Ok(wishlist);
        }

        [HttpDelete("delete/wishlist/{wishlistID}")]
        public IActionResult RemoveWishList(int wishlistID)
        {
            var wishlist = _dbContext.wishlists.Find(wishlistID);
            if (wishlist == null)
            {
                return NotFound();
            }
            _dbContext.Remove(wishlist);
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPost("new/add/newwishlist")]
        public IActionResult AddWishList([FromBody] WishList wishlists)
        {
            _dbContext.wishlists.Add(wishlists);
            _dbContext.SaveChanges();
            return Ok(wishlists.WishListID);
        }

        [HttpPut("edit/newWishlist")]
        public IActionResult EditWishList([FromBody] WishList wishListData)
        {
            var wishlist = _dbContext.wishlists.Find(wishListData.WishListID);
            if (wishlist == null)
            {
                return NotFound();
            }
            wishlist.FromDate = wishListData.FromDate;
            wishlist.ToDate = wishListData.ToDate;
            wishlist.PriceOfRoom=wishListData.PriceOfRoom;
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpGet("get/{userid}/{bookingid}")]
        public IActionResult GetWishlistsDetails(int bookingid, int userid)
        {
            var wishlists1 = _dbContext.bookingDetails.Where(booking => booking.UserID == userid && booking.BookingID == bookingid);
            if (wishlists1 == null)
            {
                return NotFound();
            }
            var wishlists2 = _dbContext.selections.Where(selection => selection.BookingID == bookingid);
            return Ok(wishlists2);

        }


    }
}