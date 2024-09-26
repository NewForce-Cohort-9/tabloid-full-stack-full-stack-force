using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IPostTagRepository
    {
        List<PostTag> GetPostTagsByPostId(int postId);
        void AddPostTag(PostTag postTag);
        void DeletePostTag(int id);
    }
}