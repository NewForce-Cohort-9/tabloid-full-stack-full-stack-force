using Microsoft.AspNetCore.Mvc;
using TabloidFullStack.Models;
using TabloidFullStack.Repositories;

namespace TabloidFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostReactionController : ControllerBase
    {
        private readonly IPostReactionRepository _postReactionRepository;

        public PostReactionController(IPostReactionRepository postReactionRepository)
        {
            _postReactionRepository = postReactionRepository;
        }

        [HttpPost]
        public IActionResult AddPostReaction([FromBody] PostReaction postReaction)
        {
            if (postReaction == null)
            {
                return BadRequest("Reaction data is not valid.");
            }

            _postReactionRepository.AddOrUpdate(postReaction);
            //return Ok();
            return Ok(postReaction);
        }

        [HttpGet("post/{postId}")]
        public IActionResult GetReactionsForPost(int postId)
        {
            var reactions = _postReactionRepository.GetReactionsWithCountForPost(postId);
            return Ok(reactions);
        }

        [HttpDelete("remove")]
        public IActionResult RemoveReaction([FromBody] PostReaction postReaction)
        {
            if (postReaction == null)
            {
                return BadRequest();
            }

            // Logic to remove the reaction
            _postReactionRepository.RemoveReaction(postReaction);
            return NoContent();
        }




        //create reaction
        [HttpPost("reaction")]
        public IActionResult AddReaction([FromBody] Reaction reaction)
        {
            if (reaction == null)
            {
                return BadRequest("Reaction data is not valid.");
            }

            _postReactionRepository.AddReaction(reaction);
            return CreatedAtAction(nameof(GetReactionsForPost), new { postId = reaction.Id }, reaction);
        }

    }
}
