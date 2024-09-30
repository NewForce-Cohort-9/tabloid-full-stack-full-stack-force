using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IReactionRepository
    {
        void Add(Reaction reaction);
        List<Reaction> GetAll();
    }
}