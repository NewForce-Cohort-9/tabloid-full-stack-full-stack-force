using TabloidFullStack.Models;
using TabloidFullStack.Utils;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace TabloidFullStack.Repositories
{
    public class ReactionRepository : BaseRepository, IReactionRepository
    {
        public ReactionRepository(IConfiguration config) : base(config) { }

        public void Add(Reaction reaction)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Reaction (Name, ImageLocation) OUTPUT INSERTED.Id VALUES (@Name, @ImageLocation)";
                    DbUtils.AddParameter(cmd, "@Name", reaction.Name);
                    DbUtils.AddParameter(cmd, "@ImageLocation", reaction.ImageLocation);

                    reaction.Id = (int)cmd.ExecuteScalar(); // Retrieve the new Id
                }
            }
        }


        public List<Reaction> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, Name, ImageLocation FROM Reaction";
                    using (var reader = cmd.ExecuteReader())
                    {
                        var reactions = new List<Reaction>();
                        while (reader.Read())
                        {
                            reactions.Add(new Reaction()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                ImageLocation = DbUtils.GetString(reader, "ImageLocation")
                            });
                        }
                        return reactions;
                    }
                }
            }
        }
    }
}
