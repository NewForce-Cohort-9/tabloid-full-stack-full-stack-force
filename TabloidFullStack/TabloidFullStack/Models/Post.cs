using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using TabloidFullStack.Models;

namespace TabloidFullStack.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string ImageLocation { get; set; }
        public DateTime CreateDateTime { get; set; }
        public DateTime? PublishDateTime { get; set; }
        public bool IsApproved { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; }

        public int UserProfileId { get; set; }

        public UserProfile Author { get; set; }

    }
}


