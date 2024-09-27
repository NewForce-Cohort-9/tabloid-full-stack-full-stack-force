using Microsoft.AspNetCore.Mvc;
using TabloidFullStack.Models;
using TabloidFullStack.Repositories;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TabloidFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        //private readonly IUserProfileRepository _userProfileRepository;
        private readonly IUserRepository _userRepository;
        public UserProfileController(IUserRepository userRepository)
        {
            //_userProfileRepository = userProfileRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var profile = _userRepository.GetById(id);
            if (profile == null)
            {
                return NotFound();
            }
            return Ok(profile);
        }


        [HttpGet("GetByEmail")]
        public IActionResult GetByEmail(string email)
        {
            var user = _userRepository.GetByEmail(email);

            if (email == null || user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.CreateDateTime = DateTime.Now;
            userProfile.UserTypeId = UserType.AUTHOR_ID;
            _userRepository.Add(userProfile);
            return CreatedAtAction(
                "GetByEmail",
                new { email = userProfile.Email },
                userProfile);
        }


        //check https://localhost:5001/uploads/dog.png
        [HttpPost("upload")]
        public IActionResult UploadProfileImage(IFormFile file, int userId) 
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            var filePath = Path.Combine("wwwroot/uploads", file.FileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            //update user profile with the new image path
            var userProfile = _userRepository.GetById(userId);
            if (userProfile != null)
            {
                userProfile.ImageLocation = $"uploads/{file.FileName}"; 
                _userRepository.Update(userProfile);
            }

            return Ok(new { FilePath = filePath });
        }



        [HttpPut("{id}")]
        public IActionResult Put(int id, UserProfile userProfile)
        {
            if (id != userProfile.Id) return BadRequest();

            _userRepository.Update(userProfile);
            return NoContent(); 
        }

    }
}
