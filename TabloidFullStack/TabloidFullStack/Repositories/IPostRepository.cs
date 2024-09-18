using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetApprovedPosts();
        List<Post> GetPostsByUser(int userId);

        Post GetPostById(int categoryId);
    }
}