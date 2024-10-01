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
                // Check if an existing subscription with EndDateTime exists
                cmd.CommandText = @"
                SELECT Id FROM Subscription 
                WHERE SubscriberUserProfileId = @SubscriberUserProfileId
                AND ProviderUserProfileId = @ProviderUserProfileId
                AND EndDateTime IS NOT NULL";

                cmd.Parameters.AddWithValue("@SubscriberUserProfileId", subscriberId);
                cmd.Parameters.AddWithValue("@ProviderUserProfileId", providerId);

                var reader = cmd.ExecuteReader();
                if (reader.Read())
                {
                    reader.Close();
                    using (var updateCmd = conn.CreateCommand())
                    {
                        updateCmd.CommandText = @"
                        UPDATE Subscription 
                        SET EndDateTime = NULL 
                        WHERE SubscriberUserProfileId = @SubscriberUserProfileId
                        AND ProviderUserProfileId = @ProviderUserProfileId";

                        updateCmd.Parameters.AddWithValue("@SubscriberUserProfileId", subscriberId);
                        updateCmd.Parameters.AddWithValue("@ProviderUserProfileId", providerId);
                        updateCmd.ExecuteNonQuery();
                    }
                }
                else
                {
                    reader.Close();
                    // No existing subscription, create a new one
                    cmd.CommandText = @"
                    INSERT INTO Subscription (SubscriberUserProfileId, ProviderUserProfileId, BeginDateTime)
                    VALUES (@SubscriberUserProfileId, @ProviderUserProfileId, @BeginDateTime)";
                    cmd.Parameters.AddWithValue("@BeginDateTime", DateTime.Now);
                    cmd.ExecuteNonQuery();
                }
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
                SELECT p.Id, p.Title, p.Content, p.ImageLocation, p.CreateDateTime, p.PublishDateTime, p.IsApproved, p.CategoryId, u.DisplayName AS AuthorDisplayName
                FROM Post p
                JOIN UserProfile u ON p.UserProfileId = u.Id
                JOIN Subscription s ON u.Id = s.ProviderUserProfileId
                WHERE s.SubscriberUserProfileId = @subscriberId
                AND s.EndDateTime IS NULL";

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
                        ImageLocation = !reader.IsDBNull(reader.GetOrdinal("ImageLocation")) ? reader.GetString(reader.GetOrdinal("ImageLocation")) : null,
                        CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                        PublishDateTime = reader.GetDateTime(reader.GetOrdinal("PublishDateTime")),
                        IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                        CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
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

    public void Unsubscribe(int subscriberId, int providerId)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                    UPDATE Subscription
                    SET EndDateTime = @EndDateTime
                    WHERE SubscriberUserProfileId = @SubscriberUserProfileId 
                    AND ProviderUserProfileId = @ProviderUserProfileId
                    AND EndDateTime IS NULL"; 

                cmd.Parameters.AddWithValue("@SubscriberUserProfileId", subscriberId);
                cmd.Parameters.AddWithValue("@ProviderUserProfileId", providerId);
                cmd.Parameters.AddWithValue("@EndDateTime", DateTime.Now);

                cmd.ExecuteNonQuery();
            }
        }
    }
    public bool IsSubscribed(int subscriberId, int providerId)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                SELECT COUNT(*)
                FROM Subscription
                WHERE SubscriberUserProfileId = @SubscriberUserProfileId 
                AND ProviderUserProfileId = @ProviderUserProfileId
                AND EndDateTime IS NULL"; 

                cmd.Parameters.AddWithValue("@SubscriberUserProfileId", subscriberId);
                cmd.Parameters.AddWithValue("@ProviderUserProfileId", providerId);

                int count = (int)cmd.ExecuteScalar();
                return count > 0;
            }
        }
    }



}

