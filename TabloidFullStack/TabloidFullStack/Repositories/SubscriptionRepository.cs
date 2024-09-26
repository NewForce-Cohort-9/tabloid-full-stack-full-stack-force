using System;
using System.Collections.Generic;
using System.Data.SqlClient;
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
                cmd.CommandText = @"
                    INSERT INTO Subscription (SubscriberUserProfileId, ProviderUserProfileId, BeginDateTime)
                    VALUES (@SubscriberUserProfileId, @ProviderUserProfileId, @BeginDateTime)";

                cmd.Parameters.AddWithValue("@SubscriberUserProfileId", subscriberId);
                cmd.Parameters.AddWithValue("@ProviderUserProfileId", providerId);
                cmd.Parameters.AddWithValue("@BeginDateTime", DateTime.Now);

                cmd.ExecuteNonQuery();
            }
        }
    }
}
