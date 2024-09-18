using Microsoft.AspNetCore.Mvc;
using TabloidFullStack.Models;
using TabloidFullStack.Repositories;

namespace TabloidFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;

        public CommentController(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        // GET: api/Comment?postId=1
        [HttpGet]
        public IActionResult GetAll(int postId)
        {
            return Ok(_commentRepository.GetCommentsByPostId(postId));
        }

        // GET: api/Comment/{id}
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var comment = _commentRepository.GetCommentById(id);
            if (comment == null)
            {
                return NotFound();
            }
            return Ok(comment);
        }

        // POST: api/Comment
        [HttpPost]
        public IActionResult Post(Comment comment)
        {
            comment.CreateDateTime = DateTime.Now;
            // comment.UserProfileId = client side get user profile from local storage 
            _commentRepository.Add(comment);
            return CreatedAtAction("GetAll", new { id = comment.Id }, comment);
        }

        // DELETE: api/Comment/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existingComment = _commentRepository.GetCommentById(id);
            if (existingComment == null)
            {
                return NotFound();
            }

            _commentRepository.Delete(id);
            return NoContent();
        }
    }
}
