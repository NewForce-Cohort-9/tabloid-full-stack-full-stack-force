using System.Collections.Generic;
using System.Data.SqlClient;
using TabloidFullStack.Models;
using Microsoft.Extensions.Configuration;

namespace TabloidFullStack.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        // Constructor to pass configuration to the base class
        public PostRepository(IConfiguration config) : base(config) { }

        public List<Post> GetApprovedPosts()
        {
            using (var conn = Connection)  // Now using the BaseRepository's Connection property
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.Title, p.Content, p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                               p.CategoryId, c.Name as CategoryName, u.DisplayName as Author
                        FROM Post p
                        JOIN UserProfile u ON p.UserProfileId = u.Id
                        JOIN Category c ON p.CategoryId = c.Id
                        WHERE p.IsApproved = 1 
                          AND p.PublishDateTime <= GETDATE()
                        ORDER BY p.PublishDateTime DESC";

                    var reader = cmd.ExecuteReader();
                    var posts = new List<Post>();

                    while (reader.Read())
                    {
                        posts.Add(new Post
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Title = reader.GetString(reader.GetOrdinal("Title")),
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                            PublishDateTime = reader.GetDateTime(reader.GetOrdinal("PublishDateTime")),
                            IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                            Category = new Category
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                Name = reader.GetString(reader.GetOrdinal("CategoryName"))
                            },
                            Author = new UserProfile
                            {
                                DisplayName = reader.GetString(reader.GetOrdinal("Author"))
                            }
                        });
                    }

                    reader.Close();
                    return posts;
                }
            }
        }
    }
}
