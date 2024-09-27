using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IReactionRepository
    {
        List<Reaction> GetReactionsWithCountForPost(int postId);
    }
}