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
