using Microsoft.AspNetCore.Mvc;
using TabloidFullStack.Models;
using TabloidFullStack.Repositories;

namespace TabloidFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReactionController : ControllerBase
    {
        private readonly IReactionRepository _reactionRepository;
        public ReactionController(IReactionRepository reactionRepository)
        {
            
            _reactionRepository = reactionRepository;
        }
        
            // ReactionController.cs
            [HttpGet("post/{postId}")]
            public IActionResult GetReactionsForPost(int postId)
            {
                var reactions = _reactionRepository.GetReactionsWithCountForPost(postId);
                return Ok(reactions);
            }
        
    }
}
