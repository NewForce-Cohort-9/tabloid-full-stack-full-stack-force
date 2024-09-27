using System;
using Microsoft.Extensions.Configuration;
using TabloidFullStack.Models;
using TabloidFullStack.Repositories;

public class SubscriptionRepository : BaseRepository, ISubscriptionRepository
{
    public SubscriptionRepository(IConfiguration config) : base(config) { }

    public void AddSubscription(int subscriberId, int providerId)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                // Check if the subscription already exists
                cmd.CommandText = @"
                SELECT COUNT(*)
                FROM Subscription
                WHERE SubscriberUserProfileId = @SubscriberUserProfileId
                AND ProviderUserProfileId = @ProviderUserProfileId";

                cmd.Parameters.AddWithValue("@SubscriberUserProfileId", subscriberId);
                cmd.Parameters.AddWithValue("@ProviderUserProfileId", providerId);

                var existingSubscriptionCount = (int)cmd.ExecuteScalar();

                if (existingSubscriptionCount > 0)
                {
                    // Subscription already exists, so don't insert it again
                    throw new Exception("Subscription already exists.");
                }

                // If no subscription exists, insert the new one
                cmd.CommandText = @"
                INSERT INTO Subscription (SubscriberUserProfileId, ProviderUserProfileId, BeginDateTime)
                VALUES (@SubscriberUserProfileId, @ProviderUserProfileId, @BeginDateTime)";

                cmd.Parameters.AddWithValue("@BeginDateTime", DateTime.Now);

                cmd.ExecuteNonQuery();
            }
        }
    }
    public List<Post> GetPostsBySubscribedAuthors(int subscriberId)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                SELECT p.Id, p.Title, p.Content, p.ImageLocation, p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                       p.CategoryId, p.UserProfileId, u.DisplayName AS AuthorDisplayName
                FROM Post p
                JOIN Subscription s ON p.UserProfileId = s.ProviderUserProfileId
                JOIN UserProfile u ON p.UserProfileId = u.Id
                WHERE s.SubscriberUserProfileId = @subscriberId";

                cmd.Parameters.AddWithValue("@subscriberId", subscriberId);

                var reader = cmd.ExecuteReader();
                var posts = new List<Post>();

                while (reader.Read())
                {
                    var post = new Post
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("Id")),
                        Title = reader.GetString(reader.GetOrdinal("Title")),
                        Content = reader.GetString(reader.GetOrdinal("Content")),
                        ImageLocation = reader.IsDBNull(reader.GetOrdinal("ImageLocation")) ? null : reader.GetString(reader.GetOrdinal("ImageLocation")),
                        CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                        PublishDateTime = reader.IsDBNull(reader.GetOrdinal("PublishDateTime")) ? (DateTime?)null : reader.GetDateTime(reader.GetOrdinal("PublishDateTime")),
                        IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                        CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                        UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                        Author = new UserProfile
                        {
                            DisplayName = reader.GetString(reader.GetOrdinal("AuthorDisplayName"))
                        }
                    };

                    posts.Add(post);
                }

                reader.Close();
                return posts;
            }
        }
    }

}
