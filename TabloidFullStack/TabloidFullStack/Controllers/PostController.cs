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

        [HttpGet("unapproved")]
        public IActionResult GetUnapprovedPosts()
        {
            var posts = _postRepository.GetUnapprovedPosts();
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

        [HttpGet("category/{categoryId}")]
        public IActionResult GetByCategory(int categoryId)
        {
            var posts = _postRepository.GetByCategoryId(categoryId);
            return Ok(posts);
        }

        [HttpGet("tag/{tagId}")]
        public IActionResult GetByTag(int tagId)
        {
            var posts = _postRepository.GetByTagId(tagId);
            return Ok(posts);
        }

        [HttpPost]
        public IActionResult Post(Post post)
        {
            post.CreateDateTime = DateTime.Now;
            if (post.Author.UserTypeId == 1)
            {
                post.IsApproved = true;
            }
            else
            {
                post.IsApproved = false;
            }
            _postRepository.AddPost(post);
            return CreatedAtAction("GetPostById", new { id = post.Id }, post);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _postRepository.DeletePost(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult UpdatePost(int id, Post post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }

            _postRepository.UpdatePost(post);

            return NoContent();
        }
        [HttpPut("upload")]
        public IActionResult UploadPostImage(IFormFile file, int postId)
        {
            if(file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            var filePath = Path.Combine("wwwroot/uploads", file.FileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            var post = _postRepository.GetPostById(postId);
            if (post != null)
            {
                post.ImageLocation = $"uploads/{file.FileName}";
                _postRepository.UpdatePost(post);
            }

            return Ok(new {FilePath = filePath});
        }
    }
}
