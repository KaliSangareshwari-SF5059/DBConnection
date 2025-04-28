using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibararyAPI.Models
{
    [Table("bookdetails", Schema = "public")]
    public class BookDetails
    {
        [Key]
        public int BookID { get; set; }
        public string BookName { get; set; }

        public string AuthorName { get; set; }  
        public string Availability { get; set; }
    }
}