using Microsoft.AspNetCore.Mvc;
using TabloidFullStack.Models;
using TabloidFullStack.Repositories; 

namespace TabloidFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminActionRequestController : ControllerBase
    {

        private readonly IAdminActionRequestRepository _adminActionRequestRepository;

        public AdminActionRequestController(IAdminActionRequestRepository adminActionRequestRepository)
        {
            _adminActionRequestRepository = adminActionRequestRepository;
        }

        // GET: api/AdminActionRequest/targetUserId/actionType
        [HttpGet("{targetUserId}/{actionType}")]
        public IActionResult GetByTargetUserIdAndAction(int targetUserId, string actionType)
        {
            var request = _adminActionRequestRepository
                .GetByTargetUserIdAndAction(targetUserId, actionType);

            if (request == null) return NotFound(); 
            
            return Ok(request);
        }

        // POST: api/AdminActionRequest
        [HttpPost]
        public IActionResult CreateRequest(AdminActionRequest request)
        {
            _adminActionRequestRepository.CreateRequest(request);

            return CreatedAtAction("GetByTargetUserIdAndAction",
                                    new { targetUserId = request.TargetUserId, actionType = request.ActionType },
                                    request);
        }

        [HttpPut("approve/{id}")]
        public IActionResult ApproveRequest(int id, AdminActionRequest request) {

            if (id != request.Id) return BadRequest();
            
           _adminActionRequestRepository.ApproveRequest(request);
            return NoContent(); 

        }

    }
}
