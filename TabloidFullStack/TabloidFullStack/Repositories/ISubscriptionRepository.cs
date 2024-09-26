using TabloidFullStack.Models;

public interface ISubscriptionRepository
{
    void AddSubscription(int subscriberId, int providerId);

    List<Post> GetPostsBySubscribedAuthors(int subscriberId);
}