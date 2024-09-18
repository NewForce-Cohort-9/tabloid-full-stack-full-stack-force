using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using System.Security.Claims;
using TabloidFullStack.Models;
using TabloidFullStack.Repositories;


//namespace TabloidFullStack.Controllers
//{
//    public class CommentController : Controller
//    {
//        private readonly ICommentRepository _commentRepository;
//        private readonly IPostRepository _postRepository;
//        private readonly IUserRepository _userRepository;


//        public CommentController(ICommentRepository commentRepository, IPostRepository postRepository, IUserRepository userRepository)
//        {
//            _commentRepository = commentRepository;
//            _postRepository = postRepository;
//            _userRepository = userRepository;
//        }

//        // GET: api/Comment?postId=1
//        [HttpGet]
//        public IActionResult GetAll(int postId)
//        {
//            return Ok(_commentRepository.GetCommentsByPostId(postId));
//        }

//        // GET: api/Comment/{id}
//        [HttpGet("{id}")]
//        public IActionResult Get(int id)
//        {
//            var comment = _commentRepository.GetCommentById(id);
//            if (comment == null)
//            {
//                return NotFound();
//            }
//            return Ok(comment);
//        }

//    }
//}




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
            var comments = _commentRepository.GetCommentsByPostId(postId);
            return Ok(comments);
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
    }
}
