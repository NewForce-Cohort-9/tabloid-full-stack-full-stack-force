using TabloidFullStack.Models;
using TabloidFullStack.Utils;

namespace TabloidFullStack.Repositories
{
    public class AdminActionRequestRepository : BaseRepository, IAdminActionRequestRepository
    {
        public AdminActionRequestRepository(IConfiguration config) : base(config) { }

        public List<AdminActionRequest> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = "SELECT * FROM AdminActionRequest";

                    var reader = cmd.ExecuteReader();

                    var requests = new List<AdminActionRequest>();

                    while (reader.Read())
                    {

                        requests.Add(new AdminActionRequest()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            TargetUserId = reader.GetInt32(reader.GetOrdinal("TargetUserId")),
                            RequestingAdminId = reader.GetInt32(reader.GetOrdinal("RequestingAdminId")),
                            ApprovingAdminId = DbUtils.GetNullableInt(reader, "ApprovingAdminId"),
                            ActionType = reader.GetString(reader.GetOrdinal("ActionType")),
                            IsCompleted = reader.GetBoolean(reader.GetOrdinal("IsCompleted")),
                            RequestedAt = DbUtils.GetNullableDateTime(reader, "RequestedAt"),
                            ApprovedAt = DbUtils.GetNullableDateTime(reader, "ApprovedAt"),
                        });

                    }

                    reader.Close();
                    return requests;
                }

            }
        }

        public AdminActionRequest GetByTargetUserIdAndAction(int targetUserId, string actionType)
        {

            using (var conn = Connection)
            {

                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT ar.Id, ar.TargetUserId, ar.RequestingAdminId, ra.DisplayName AS RequestingAdminName, ra.Email AS RequestingAdminEmail,
                               ar.ApprovingAdminId, aa.DisplayName AS ApprovingAdminName, aa.Email AS ApprovingAdminEmail, ar.ActionType,
                               ar.IsCompleted, ar.RequestedAt, ar.ApprovedAt
                        FROM AdminActionRequest ar
                        LEFT JOIN UserProfile ra ON ar.RequestingAdminId = ra.Id 
                        LEFT JOIN UserProfile aa ON ar.ApprovingAdminId = aa.Id 
                        WHERE ar.TargetUserId = @TargetUserId AND ActionType = @ActionType AND ar.IsCompleted = 0";

                    cmd.Parameters.AddWithValue("@TargetUserId", targetUserId);
                    cmd.Parameters.AddWithValue("@ActionType", actionType);

                    var reader = cmd.ExecuteReader();
                    AdminActionRequest request = null;

                    if (reader.Read())
                    {
                        request = new AdminActionRequest()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            TargetUserId = reader.GetInt32(reader.GetOrdinal("TargetUserId")),
                            RequestingAdminId = reader.GetInt32(reader.GetOrdinal("RequestingAdminId")),
                            ApprovingAdminId = DbUtils.GetNullableInt(reader, "ApprovingAdminId"),
                            ActionType = reader.GetString(reader.GetOrdinal("ActionType")),
                            RequestedAt = DbUtils.GetNullableDateTime(reader, "RequestedAt"),
                            ApprovedAt = DbUtils.GetNullableDateTime(reader, "ApprovedAt"),
                            IsCompleted = reader.GetBoolean(reader.GetOrdinal("IsCompleted")),
                            //RequestingAdminName = DbUtils.GetString(reader, "RequestingAdminName"),
                            //ApprovingAdminName = DbUtils.GetString(reader, "ApprovingAdminName"),
                        };
                    }
                    reader.Close();
                    return request;
                }
            }
        }



        public void CreateRequest(AdminActionRequest request)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"
                        INSERT INTO AdminActionRequest (TargetUserId, RequestingAdminId, ActionType, RequestedAt)
                        OUTPUT INSERTED.ID
                        VALUES (@TargetUserId, @RequestingAdminId, @ActionType, @RequestDate)";

                    cmd.Parameters.AddWithValue("@TargetUserId", request.TargetUserId);
                    cmd.Parameters.AddWithValue("@RequestingAdminId", request.RequestingAdminId);
                    cmd.Parameters.AddWithValue("@ActionType", request.ActionType);
                    cmd.Parameters.AddWithValue("@RequestDate", request.RequestedAt);

                    request.Id = (int)cmd.ExecuteScalar();
                }

            }
        }

        public void ApproveRequest(AdminActionRequest request)
        {
            using (var conn = Connection)
            {

                conn.Open();

                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"
                        UPDATE AdminActionRequest
                        SET 
                           ApprovingAdminId = @ApprovingAdminId,
                           IsCompleted = @IsCompleted,
                           ApprovedAt = @ApprovedAt
                        WHERE Id = @RequestId";

                    cmd.Parameters.AddWithValue("@RequestId", request.Id);
                    cmd.Parameters.AddWithValue("@ApprovingAdminId", request.ApprovingAdminId);
                    cmd.Parameters.AddWithValue("@ApprovedAt", request.ApprovedAt);
                    cmd.Parameters.AddWithValue("@IsCompleted", request.IsCompleted);

                    cmd.ExecuteNonQuery();

                }

            }
        }
    }
}
