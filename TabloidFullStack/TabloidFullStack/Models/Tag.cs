using System.ComponentModel.DataAnnotations;


namespace TabloidFullStack.Models
{
    public class Tag
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(32)]
        public string Name { get; set; }    
    }
}
