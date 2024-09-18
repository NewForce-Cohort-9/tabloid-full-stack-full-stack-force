using Microsoft.AspNetCore.Mvc;
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


    }
}
