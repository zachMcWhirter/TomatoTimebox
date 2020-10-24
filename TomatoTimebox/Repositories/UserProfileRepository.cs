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
                            (Id, 
                            FirebaseUserId,
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
