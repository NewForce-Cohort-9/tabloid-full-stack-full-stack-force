using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace TabloidFullStack.Models
{
    public class Comment
    {
        public int Id { get; set; }

        [Required]
        public string Subject { get; set; }

        [Required]
        public string? Content { get; set; }

        [DisplayName("Author")]
        public int UserProfileId { get; set; }
        public UserProfile? UserProfile { get; set; } 

        [DisplayName("Created on")]
        public DateTime CreateDateTime { get; set; }

        public Post? Post { get; set; } 
        public int PostId { get; set; }


    }
}
