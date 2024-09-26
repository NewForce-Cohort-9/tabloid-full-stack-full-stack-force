using System.Collections.Generic;
using System.Data.SqlClient;
using TabloidFullStack.Models;
using Microsoft.Extensions.Configuration;
using TabloidFullStack.Utils;
namespace TabloidFullStack.Repositories
{
    public class PostTagRepository : BaseRepository, IPostTagRepository
    {
        public PostTagRepository(IConfiguration configuration) : base(configuration) { }

        public List<PostTag> GetPostTagsByPostId(int postId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, PostId, TagId FROM PostTag WHERE PostId = @postId";
                    DbUtils.AddParameter(cmd, "@postId", postId);

                    var reader = cmd.ExecuteReader();
                    List<PostTag> postTags = new List<PostTag>();
                    while (reader.Read())
                    {
                        postTags.Add(new PostTag()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            PostId = postId,
                            TagId = DbUtils.GetInt(reader, "TagId")
                        });
                    }
                    reader.Close();
                    return postTags;
                }
            }
        }
        public void AddPostTag(PostTag postTag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO PostTag (PostId, TagId) OUTPUT INSERTED.ID VALUES (@PostId, @TagId)";
                    DbUtils.AddParameter(cmd, "@PostId", postTag.PostId);
                    DbUtils.AddParameter(cmd, "@TagId", postTag.TagId);

                    postTag.Id = (int)cmd.ExecuteScalar();
                }
            }
                

        }

        public void DeletePostTag(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM PostTag WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
