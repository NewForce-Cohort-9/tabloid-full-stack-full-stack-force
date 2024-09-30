using Microsoft.AspNetCore.Mvc;
using TabloidFullStack.Models;
using TabloidFullStack.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

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

        // GET: api/<ReactionController>
        [HttpGet]
        public IActionResult GetAllReactions()
        {
            var reactions = _reactionRepository.GetAll();
            return Ok(reactions);
        }

        [HttpPost]
        public IActionResult AddReaction([FromBody] Reaction reaction)
        {
            if (reaction == null)
            {
                return BadRequest("Reaction data is not valid.");
            }

            _reactionRepository.Add(reaction); // No manual Id assignment here
            return CreatedAtAction(nameof(GetAllReactions), new { id = reaction.Id }, reaction);
        }


    }
}
