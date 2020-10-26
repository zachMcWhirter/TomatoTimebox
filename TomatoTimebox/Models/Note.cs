using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TomatoTimebox.Models
{
    public class Note
    {
        public int Id { get; set; }

        [Required]
        public string Content { get; set; }

        [Required]
        public DateTime CreateDateTime { get; set; }

        [Required]
        public int TaskId { get; set; }

        public Task Task { get; set; }

    }
}
