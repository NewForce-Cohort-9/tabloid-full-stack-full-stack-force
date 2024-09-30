using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IPostReactionRepository
    {
        //void Add(PostReaction postReaction);
        void AddOrUpdate(PostReaction postReaction);
        List<Reaction> GetReactionsWithCountForPost(int postId);
        PostReaction GetUserReaction(int postId, int userProfileId);
        void RemoveReaction(PostReaction postReaction);
    }
}