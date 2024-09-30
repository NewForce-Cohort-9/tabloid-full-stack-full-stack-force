

namespace TabloidFullStack.Models
{
    public class AdminActionRequest
    {
        public int Id { get; set; } 
        public int TargetUserId { get; set; }
        public int RequestingAdminId { get; set; }  
        public int? ApprovingAdminId { get; set; }
        public string ActionType { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime? RequestedAt { get; set; }
        public DateTime? ApprovedAt { get; set; }    
        public string RequestingAdminName { get; set; }
        public string ApprovingAdminName { get; set; }  
    }
}
