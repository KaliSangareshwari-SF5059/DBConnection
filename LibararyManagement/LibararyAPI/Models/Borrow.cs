using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibararyAPI.Models
{
    [Table("borrow", Schema = "public")]
    public class Borrow
    {
        [Key]
        public int BorrowID { get; set; }
        public int BookID { get; set; }
        public string BookName { get; set; }
        public int CustomerID { get; set; }
        public double FineAmount { get; set; }
        public string BookingStatus { get; set; }
        public DateTime BorrowDate { get; set; }
    }
}