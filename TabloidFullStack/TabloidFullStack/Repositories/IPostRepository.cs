using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetApprovedPosts();
        List<Post> GetPostsByUser(int userId);
        List<Post> GetByCategoryId(int categoryId);

        Post GetPostById(int categoryId);

        void AddPost(Post post);

        void DeletePost(int postId);

        void UpdatePost(Post post);
    }
}