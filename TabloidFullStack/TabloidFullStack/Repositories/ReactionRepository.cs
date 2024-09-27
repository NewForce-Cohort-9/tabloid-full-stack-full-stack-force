using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public class ReactionRepository : BaseRepository, IReactionRepository
    { // Constructor to pass configuration to the base class
        public ReactionRepository(IConfiguration config) : base(config) { }
        public List<Reaction> GetReactionsWithCountForPost(int postId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT 
                    r.Id, r.Name, r.ImageLocation, COUNT(pr.Id) AS ReactionCount
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
