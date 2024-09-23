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
        public List<Post> GetPostsByUser(int userId)
        {
            using (var conn = Connection)
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
                WHERE p.UserProfileId = @userId
                ORDER BY p.CreateDateTime DESC";

                    cmd.Parameters.AddWithValue("@userId", userId);

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

        public Post GetPostById(int postId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT p.Id, p.Title, p.Content, p.ImageLocation, p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                       c.Name AS CategoryName, u.DisplayName AS Author
                FROM Post p
                JOIN Category c ON p.CategoryId = c.Id
                JOIN UserProfile u ON p.UserProfileId = u.Id
                WHERE p.Id = @postId";

                    cmd.Parameters.AddWithValue("@postId", postId);

                    var reader = cmd.ExecuteReader();
                    Post post = null;

                    if (reader.Read())
                    {
                        post = new Post
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Title = reader.GetString(reader.GetOrdinal("Title")),
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            ImageLocation = reader.IsDBNull(reader.GetOrdinal("ImageLocation"))
                                ? null
                                : reader.GetString(reader.GetOrdinal("ImageLocation")),
                            CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                            PublishDateTime = reader.IsDBNull(reader.GetOrdinal("PublishDateTime"))
                                ? (DateTime?)null
                                : reader.GetDateTime(reader.GetOrdinal("PublishDateTime")),
                            Author = new UserProfile
                            {
                                DisplayName = reader.GetString(reader.GetOrdinal("Author"))
                            }
                        };
                    }

                    reader.Close();
                    return post;
                }
            }
        }

        public void AddPost(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Post (Title, Content, CreateDateTime, PublishDateTime, IsApproved, CategoryId, UserProfileId)
                        OUTPUT INSERTED.ID
                        VALUES (@Title, @Content, @CreateDateTime, @PublishDateTime, @IsApproved, @CategoryId, @UserProfileId)";

                    cmd.Parameters.AddWithValue("@Title", post.Title);
                    cmd.Parameters.AddWithValue("@Content", post.Content);
                    cmd.Parameters.AddWithValue("@CreateDateTime", post.CreateDateTime);
                    cmd.Parameters.AddWithValue("@PublishDateTime", post.PublishDateTime ?? (object)DBNull.Value);
                    cmd.Parameters.AddWithValue("@IsApproved", post.IsApproved);
                    cmd.Parameters.AddWithValue("@CategoryId", post.CategoryId);
                    cmd.Parameters.AddWithValue("@UserProfileId", post.UserProfileId);

                    post.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void DeletePost(int postId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Post WHERE Id = @postId";
                    cmd.Parameters.AddWithValue("@postId", postId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Post> GetByCategoryId(int categoryId)
        { 
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.Id, p.Title, p.Content, p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                       p.CategoryId, c.Name as CategoryName, u.DisplayName as Author
                FROM Post p
                JOIN UserProfile u ON p.UserProfileId = u.Id
                JOIN Category c ON p.CategoryId = c.Id
                WHERE p.CategoryId = @categoryId
                ORDER BY p.CreateDateTime DESC";
                    cmd.Parameters.AddWithValue("@categoryId", categoryId);

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
