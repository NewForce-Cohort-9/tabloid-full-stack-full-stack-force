using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IAdminActionRequestRepository
    {
        void ApproveRequest(AdminActionRequest request);
        void CreateRequest(AdminActionRequest request);
        List<AdminActionRequest> GetAll();
        AdminActionRequest GetByTargetUserIdAndAction(int targetUserId, string actionType);
    }
}