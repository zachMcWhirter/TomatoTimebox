using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TomatoTimebox.Models
{
    public class UserProfile
    {
        public int Id { get; set; }

        [StringLength(28, MinimumLength = 28)]
        public string FirebaseUserId { get; set; }

        [Required]
        public string DisplayName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public DateTime CreateDateTime { get; set; }

        public string ImageLocation { get; set; }

        public List<Task> Tasks { get; set; }
    }
}
