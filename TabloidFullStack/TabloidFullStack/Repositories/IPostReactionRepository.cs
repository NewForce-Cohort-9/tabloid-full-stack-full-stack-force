using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IPostReactionRepository
    {
        void Add(PostReaction postReaction);
        List<Reaction> GetReactionsWithCountForPost(int postId);
    }
}