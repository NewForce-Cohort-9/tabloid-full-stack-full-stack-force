using Microsoft.AspNetCore.Mvc;
using TabloidFullStack.Models; 
using TabloidFullStack.Repositories;

namespace TabloidFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly ITagRepository _tagRepository; 

        public TagController(ITagRepository tagRepository)
        {
            _tagRepository = tagRepository;
        }

        [HttpGet]
        public IActionResult Get() { 
        return Ok(_tagRepository.GetAll());
        }


    }
}
