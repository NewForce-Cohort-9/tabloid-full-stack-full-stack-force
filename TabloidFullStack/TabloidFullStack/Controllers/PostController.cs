using Microsoft.AspNetCore.Mvc;
using TabloidFullStack.Models;
using TabloidFullStack.Repositories;

namespace TabloidFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;

   
        public PostController(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        [HttpGet]
        public IActionResult GetApprovedPosts()
        {
            var posts = _postRepository.GetApprovedPosts();
            return Ok(posts);
        }
        [HttpGet("myposts/{userId}")]
        public IActionResult GetPostsByUser(int userId)
        {
            var posts = _postRepository.GetPostsByUser(userId);
            return Ok(posts);
        }
        [HttpGet("{id}")]
        public IActionResult GetPostById(int id)
        {
            var post = _postRepository.GetPostById(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        [HttpPost]
        public IActionResult Post(Post post)
        {
            post.CreateDateTime = DateTime.Now;
            post.IsApproved = true;
            _postRepository.AddPost(post);
            return CreatedAtAction("GetPostById", new { id = post.Id }, post); 
        }

    }
}
