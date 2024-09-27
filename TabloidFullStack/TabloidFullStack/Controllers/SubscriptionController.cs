using Microsoft.AspNetCore.Mvc;
using TabloidFullStack.Repositories;
using TabloidFullStack.Models;

[Route("api/[controller]")]
[ApiController]
public class SubscriptionController : ControllerBase
{
    private readonly ISubscriptionRepository _subscriptionRepository;
    private readonly IPostRepository _postRepository; 

    public SubscriptionController(ISubscriptionRepository subscriptionRepository, IPostRepository postRepository)
    {
        _subscriptionRepository = subscriptionRepository;
        _postRepository = postRepository; 
    }

    [HttpPost]
    public IActionResult Subscribe(int subscriberId, int providerId)
    {
        try
        {
            _subscriptionRepository.AddSubscription(subscriberId, providerId);
            return Ok(new { message = "Subscription successful" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

    [HttpGet("subscriptions/{subscriberId}/posts")]
    public IActionResult GetPostsBySubscribedAuthors(int subscriberId)
    {
        try
        {
            var posts = _subscriptionRepository.GetPostsBySubscribedAuthors(subscriberId);
            return Ok(posts);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

}
