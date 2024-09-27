using TabloidFullStack.Models;
using TabloidFullStack.Utils;

namespace TabloidFullStack.Repositories
{
    public class PostReactionRepository : BaseRepository, IPostReactionRepository
    {
        public PostReactionRepository(IConfiguration config) : base(config) { }
        public void Add(PostReaction postReaction)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO PostReaction (PostId, ReactionId, UserProfileId) 
                                VALUES (@PostId, @ReactionId, @UserProfileId)";
                    DbUtils.AddParameter(cmd, "@PostId", postReaction.PostId);
                    DbUtils.AddParameter(cmd, "@ReactionId", postReaction.ReactionId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", postReaction.UserProfileId);

                    cmd.ExecuteNonQuery();
                }
            }
        }


        public List<Reaction> GetReactionsWithCountForPost(int postId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT r.Id, r.Name, r.ImageLocation, COUNT(pr.Id) AS ReactionCount
                FROM Reaction r
                LEFT JOIN PostReaction pr ON pr.ReactionId = r.Id AND pr.PostId = @postId
                GROUP BY r.Id, r.Name, r.ImageLocation";

                    cmd.Parameters.AddWithValue("@postId", postId);
                    using (var reader = cmd.ExecuteReader())
                    {
                        var reactions = new List<Reaction>();
                        while (reader.Read())
                        {
                            reactions.Add(new Reaction()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                                ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation")),
                                ReactionCount = reader.GetInt32(reader.GetOrdinal("ReactionCount"))
                            });
                        }
                        return reactions;
                    }
                }
            }
        }


    }
}
