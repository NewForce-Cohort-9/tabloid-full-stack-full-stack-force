using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetApprovedPosts();
        List<Post> GetPostsByUser(int userId);
        List<Post> GetByCategoryId(int categoryId);

        List<Post> GetPostsBySubscribedAuthors(int subscriberId);

        Post GetPostById(int categoryId);

        

        void AddPost(Post post);

        void DeletePost(int postId);

        List<Post> GetByTagId(int tagId);

        void UpdatePost(Post post);

    }
}