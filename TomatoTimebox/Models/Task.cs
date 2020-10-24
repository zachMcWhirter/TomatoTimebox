using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TomatoTimebox.Models
{
    public class Task
    {
        public int Id { get; set; }


        public int UserProfileId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        public int CategoryId { get; set; }

        [Required]
        public Boolean IsFinished { get; set; }

    }
}
