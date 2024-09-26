using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IPostTagRepository
    {
        void AddPostTag(PostTag postTag);
        void DeletePostTag(int id);
    }
}