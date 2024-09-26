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
}
