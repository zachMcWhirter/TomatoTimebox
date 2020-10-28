using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using TomatoTimebox.Models;
using TomatoTimebox.Utils;

namespace TomatoTimebox.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration config) : base(config) { }

        // Helper method that defines the new object and stores it in  
        // the NewUserProfileFromReader variable.
        private UserProfile NewUserProfileFromReader(SqlDataReader reader)
        {
            return new UserProfile()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                FirebaseUserId = reader.GetString(reader.GetOrdinal("FirebaseUserId")),
                DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                Email = reader.GetString(reader.GetOrdinal("Email")),
                CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation")),
            };
        }

        // Get all UserProfiles and make a list of them
        public List<UserProfile> GetAllUserProfiles()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT 
                            Id, 
                            FirebaseUserId,
                            DisplayName,
                            Email,
                            CreateDateTime,
                            ImageLocation
                        FROM UserProfile";

                    var reader = cmd.ExecuteReader();

                    var userProfiles = new List<UserProfile>();

                    while (reader.Read())
                    {
                        userProfiles.Add(NewUserProfileFromReader(reader));
                    }

                    reader.Close();

                    return userProfiles;
                }
            };
        }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT 
                            Id, 
                            FirebaseUserId, 
                            DisplayName,
                            Email, 
                            CreateDateTime,
                            ImageLocation
                        FROM UserProfile 
                        WHERE FirebaseUserId = @FirebaseUserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation")
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        // Get a single UserProfile by its Id
        public UserProfile GetUserProfileById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT 
                            Id, 
                            FirebaseUserId,
                            DisplayName,
                            Email,
                            CreateDateTime,
                            ImageLocation
                        FROM UserProfile
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = NewUserProfileFromReader(reader);
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        //// Get all Tasks for a single user by UserProfileId
        //public UserProfile GetAllTasksForUser(int id)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //                SELECT
        //                    t.Id,
        //                    t.[Name] AS TaskName,
        //                    t.Description,
        //                    t.IsFinished,
        //                    t.CategoryId,
        //                    t.UserProfileId,

        //                    c.[Name] AS CategoryName,

        //                    u.FirebaseUserId,
        //                    u.DisplayName,
        //                    u.Email,
        //                    u.CreateDateTime,
        //                    u.ImageLocation

        //                FROM Task t
        //                LEFT JOIN Category c ON t.CategoryId = c.Id
        //                LEFT JOIN UserProfile u ON t.UserProfileId = u.id
        //                WHERE u.id = @Id";

        //            DbUtils.AddParameter(cmd, "@Id", id);

        //            var reader = cmd.ExecuteReader();

        //            UserProfile userProfile = null;
        //            while (reader.Read())
        //            {
        //                if (userProfile == null)
        //                {
        //                    userProfile = NewUserProfileFromReader(reader);
        //                    {
        //                        userProfile.Tasks = new List<Task>();                               
        //                    };
        //                }
        //                if (DbUtils.IsNotDbNull(reader, "TaskId"))
        //                {
        //                    userProfile.Tasks.Add(new Task()
        //                    {
        //                        Id = DbUtils.GetInt(reader, "NoteId"),
        //                        TaskId = userProfile.Id,
        //                        Name = DbUtils.GetString(reader, "Name"),
        //                        Description = DbUtils.GetString(reader, "Description"),
        //                        IsFinished = DbUtils.Get(reader, "IsFinished")
        //                    });
        //                }
        //            }
        //            reader.Close();

        //            return userProfile;
        //        }
        //    }
        //}

        // Create a new UserProfile
        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO [UserProfile] 
                            (FirebaseUserId,
                            DisplayName,
                            Email,
                            CreateDateTime,
                            ImageLocation)
                        OUTPUT INSERTED.ID
                        VALUES (@FirebaseUserId, 
                            @DisplayName,
                            @Email,
                            @CreateDateTime,
                            @ImageLocation)";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@DisplayName", userProfile.DisplayName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", userProfile.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@ImageLocation", userProfile.ImageLocation);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        // Edit a UserProfile
        public void Update(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE [UserProfile]
                        SET 
                            FirebaseUserId = @FirebaseUserId,
                            DisplayName = @DisplayName, 
                            Email = @Email, 
                            CreateDateTime = @CreateDateTime,
		                    ImageLocation = @ImageLocation
                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@Id", userProfile.Id);
                    cmd.Parameters.AddWithValue("@FirebaseUserId", userProfile.FirebaseUserId);
                    cmd.Parameters.AddWithValue("@DisplayName", userProfile.DisplayName);
                    cmd.Parameters.AddWithValue("@Email", userProfile.Email);
                    cmd.Parameters.AddWithValue("@CreateDateTime", userProfile.CreateDateTime);
                    cmd.Parameters.AddWithValue("@ImageLocation", userProfile.ImageLocation);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        // Delete a UserProfile
        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM [UserProfile]
                        WHERE Id = @Id";
                        
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
