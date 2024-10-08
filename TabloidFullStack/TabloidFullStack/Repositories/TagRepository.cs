﻿using TabloidFullStack.Models;
using TabloidFullStack.Utils;

namespace TabloidFullStack.Repositories
{
    public class TagRepository : BaseRepository, ITagRepository
    {
        public TagRepository(IConfiguration configuration) : base(configuration) { }

        public List<Tag> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"SELECT * FROM Tag
                                        ORDER BY Name";

                    List<Tag> tags = [];

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        tags.Add(new Tag()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")), 
                        });
                    }

                    reader.Close();
                    return tags;

                }
            }
        }

        public Tag GetById(int id)
        {
            using (var conn = Connection) { 
            
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"SELECT * FROM Tag
                                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();
                    Tag tag = null;

                    if (reader.Read())
                    {
                        tag = new Tag()
                        {
                            Id = id,
                            Name = DbUtils.GetString(reader, "Name")
                        };
                    }
                    reader.Close();
                    return tag; 
                }

             }
            
         }

        public void Add(Tag tag) {

            using (var conn = Connection) {
            
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Tag
                        OUTPUT INSERTED.Id
                        VALUES (@Name)";

                    DbUtils.AddParameter(cmd, "@Name", tag.Name); 

                    tag.Id = (int)cmd.ExecuteScalar();
                }
            }
        
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Tag WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery(); 
                }
            }
        }

        public void Update(Tag tag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Tag
                            SET Name = @Name
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", tag.Id); 
                    DbUtils.AddParameter(cmd, "@Name", tag.Name);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
    
