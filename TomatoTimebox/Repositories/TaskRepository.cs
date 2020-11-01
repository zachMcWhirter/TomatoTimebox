using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using TomatoTimebox.Models;
using TomatoTimebox.Repositories;
using TomatoTimebox.Utils;

namespace TomatoTimebox.Repositories
{
    public class TaskRepository : BaseRepository, ITaskRepository
    {
        public TaskRepository(IConfiguration config) : base(config) { }

        // Helper method that defines the new object and stores it in  
        // the NewTaskFromReader variable.
        private Task NewTaskFromReader(SqlDataReader reader)

        {
            return new Task()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Name = reader.GetString(reader.GetOrdinal("TaskName")),
                Description = reader.GetString(reader.GetOrdinal("Description")),
                IsFinished = reader.GetBoolean(reader.GetOrdinal("IsFinished")),
                CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                Category = new Category()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                    Name = reader.GetString(reader.GetOrdinal("CategoryName"))
                },
                UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                UserProfile = new UserProfile()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                    FirebaseUserId = reader.GetString(reader.GetOrdinal("FirebaseUserId")),
                    DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                    Email = reader.GetString(reader.GetOrdinal("Email")),
                    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                    ImageLocation = DbUtils.GetNullableString(reader, "ImageLocation"),
                }
            };
        }

        //Get all Tasks and list them
        public List<Task> GetAllTasks()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT  
                            t.Id, 
                            t.[Name] AS TaskName, 
                            t.Description, 
                            t.IsFinished, 
                            t.CategoryId,
                            t.UserProfileId,
                    
                            c.[Name] AS CategoryName,

                            u.FirebaseUserId, 
                            u.DisplayName,
                            u.Email,
                            u.CreateDateTime,
                            u.ImageLocation
                              
                        FROM Task t
                        LEFT JOIN Category c ON t.CategoryId = c.Id
                        LEFT JOIN UserProfile u ON t.UserProfileId = u.id";

                    var reader = cmd.ExecuteReader();

                    var tasks = new List<Task>();

                    while (reader.Read())
                    {
                        tasks.Add(NewTaskFromReader(reader));
                    }

                    reader.Close();

                    return tasks;
                }
            };
        }

        // Get a single task by Id
        public Task GetTaskById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT  
                            t.Id, 
                            t.[Name] AS TaskName, 
                            t.Description, 
                            t.IsFinished, 
                            t.CategoryId,
                            t.UserProfileId,
                    
                            c.[Name] AS CategoryName,

                            u.FirebaseUserId, 
                            u.DisplayName,
                            u.Email,
                            u.CreateDateTime,
                            u.ImageLocation
                              
                        FROM Task t
                        LEFT JOIN Category c ON t.CategoryId = c.Id
                        LEFT JOIN UserProfile u ON t.UserProfileId = u.id
                        WHERE t.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    Task task = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        task = NewTaskFromReader(reader);
                    }
                    reader.Close();

                    return task;
                }
            }
        }

        // Create a Task 
        public void Add(Task task)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO [Task] (
                            Name, 
                            Description, 
                            IsFinished, 
                            CategoryId,
                            UserProfileId)
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Name, 
                            @Description,
                            @IsFinished,
                            @CategoryId,
                            @UserProfileId
                            )";
                    DbUtils.AddParameter(cmd, "@Name", task.Name);
                    DbUtils.AddParameter(cmd, "@Description", task.Description);
                    DbUtils.AddParameter(cmd, "@IsFinished", task.IsFinished);
                    DbUtils.AddParameter(cmd, "@CategoryId", task.CategoryId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", task.UserProfileId);

                    task.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        // Edit a Task
        public void Update(Task task)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE [Task]
                        SET 
                            Name = @Name,
                            Description = @Description, 
                            IsFinished = @IsFinished, 
                            CategoryId = @CategoryId,
		                    UserProfileId = @UserProfileId
                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@Id", task.Id);
                    cmd.Parameters.AddWithValue("@Name", task.Name);
                    cmd.Parameters.AddWithValue("@Description", task.Description);
                    cmd.Parameters.AddWithValue("@IsFinished", task.IsFinished);
                    cmd.Parameters.AddWithValue("@CategoryId", task.CategoryId);
                    cmd.Parameters.AddWithValue("@UserProfileId", task.UserProfileId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        // Edit a CheckBox
        public void Toggle(int id, bool isFinished)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE [Task]
                        SET 
                            IsFinished = @IsFinished
                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@Id", id);
                    cmd.Parameters.AddWithValue("@IsFinished", isFinished);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        // Delete a Task
        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM [Task]
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }

        }

        // Get all Tasks with their Notes
        public List<Task> GetAllTasksWithNotes()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT
                            t.Id,
                            t.[Name] AS TaskName,
                            t.Description,
                            t.IsFinished,
                            t.CategoryId,
                            t.UserProfileId,

                            c.[Name] AS CategoryName,

                            u.FirebaseUserId,
                            u.DisplayName,
                            u.Email,
                            u.CreateDateTime,
                            u.ImageLocation,

                            n.Id AS NoteId,
                            n.Content,
                            n.CreateDateTime,
                            n.TaskId AS TaskIdForNote

                        FROM Task t
                        LEFT JOIN Category c ON t.CategoryId = c.Id
                        LEFT JOIN UserProfile u ON t.UserProfileId = u.id
                        LEFT JOIN Note n ON n.TaskId = t.Id
                        ORDER BY n.CreateDateTime DESC";

                    var reader = cmd.ExecuteReader();

                    var tasks = new List<Task>();

                    while (reader.Read())
                    {
                        tasks.Add(NewTaskFromReader(reader));
                    }

                    reader.Close();

                    return tasks;
                }
            };
        }

        // -- Get all the notes for single Task By TaskId
        public Task GetAllNotesForSingleTaskId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT
                            t.Id,
                            t.[Name] AS TaskName,
                            t.Description,
                            t.IsFinished,
                            t.CategoryId,
                            t.UserProfileId,

                            c.[Name] AS CategoryName,

                            u.FirebaseUserId,
                            u.DisplayName,
                            u.Email,
                            u.CreateDateTime,
                            u.ImageLocation,

                            n.Id AS NoteId,
                            n.Content,
                            n.CreateDateTime AS CreateDateTimeForNote,
                            n.TaskId AS TaskIdForNote

                        FROM Task t
                        LEFT JOIN Category c ON t.CategoryId = c.Id
                        LEFT JOIN UserProfile u ON t.UserProfileId = u.id
                        LEFT JOIN Note n ON n.TaskId = t.Id
                        WHERE t.Id = @Id
                        ORDER BY n.CreateDateTime DESC";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Task task = null; 
                    while (reader.Read())
                    {
                        if(task == null)
                        {
                            task = NewTaskFromReader(reader);
                            {
                                task.Notes = new List<Note>();
                            };
                        }
                        if (DbUtils.IsNotDbNull(reader, "NoteId"))
                        {
                            task.Notes.Add(new Note()
                            {
                                Id = DbUtils.GetInt(reader, "NoteId"),
                                Content = DbUtils.GetString(reader, "Content"),
                                TaskId = task.Id,
                                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTimeForNote")
                            });
                        }

                    }
                   
                    reader.Close();

                    return task;
                }
            }
        }

        // Get all Tasks For a single user by UserProfileId
        public List<Task> GetAllTasksForSingleUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT
                            t.Id,
                            t.[Name] AS TaskName,
                            t.Description,
                            t.IsFinished,
                            t.CategoryId,
                            t.UserProfileId,

                            c.[Name] AS CategoryName

                        FROM [Task] t
                        LEFT JOIN Category c ON t.CategoryId = c.Id
                        WHERE t.UserProfileId = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    var tasks = new List<Task>();
                    while (reader.Read())
                    {
                        tasks.Add(new Task()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "TaskName"),
                            Description = DbUtils.GetString(reader, "Description"),
                            IsFinished = reader.GetBoolean(reader.GetOrdinal("IsFinished")),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            Category = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "CategoryId"),
                                Name = DbUtils.GetString(reader, "CategoryName"),
                            },
                        });
                    };

                    reader.Close();

                    return tasks;
                }              
            }
        }

        // GetUserSpecificTaskById
        public Task GetUserSpecificTaskById(int id, int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT  
                            t.Id, 
                            t.[Name] AS TaskName, 
                            t.Description, 
                            t.IsFinished, 
                            t.CategoryId,
                            t.UserProfileId,
                    
                            c.[Name] AS CategoryName,

                            u.FirebaseUserId, 
                            u.DisplayName,
                            u.Email,
                            u.CreateDateTime,
                            u.ImageLocation
                              
                        FROM Task t
                        LEFT JOIN Category c ON t.CategoryId = c.Id
                        LEFT JOIN UserProfile u ON t.UserProfileId = u.id
                        WHERE t.Id = @Id
                        AND t.UserProfileId = @UserProfileId";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    DbUtils.AddParameter(cmd, "@UserProfileId", userProfileId);

                    Task task = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        task = NewTaskFromReader(reader);
                    }
                    reader.Close();

                    return task;
                }
            }
        }

        public Task GetAllTasksWithNotesForSingleUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT
                            t.Id,
                            t.[Name] AS TaskName,
                            t.Description,
                            t.IsFinished,
                            t.CategoryId,
                            t.UserProfileId,

                            c.[Name] AS CategoryName,

                            u.FirebaseUserId,
                            u.DisplayName,
                            u.Email,
                            u.CreateDateTime,
                            u.ImageLocation,

                            n.Id AS NoteId,
                            n.Content,
                            n.CreateDateTime,
                            n.TaskId AS TaskIdForNote

                        FROM Task t
                        LEFT JOIN Category c ON t.CategoryId = c.Id
                        LEFT JOIN UserProfile u ON t.UserProfileId = u.id
                        LEFT JOIN Note n ON n.TaskId = t.Id
                        WHERE u.id = @Id
                        ORDER BY n.CreateDateTime DESC";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Task task = null;
                    while (reader.Read())
                    {
                        if (task == null)
                        {
                            task = NewTaskFromReader(reader);
                            {
                                task.Notes = new List<Note>();
                            };
                        }
                        if (DbUtils.IsNotDbNull(reader, "NoteId"))
                        {
                            task.Notes.Add(new Note()
                            {
                                Id = DbUtils.GetInt(reader, "NoteId"),
                                Content = DbUtils.GetString(reader, "Content"),
                                TaskId = task.Id,
                                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime")
                            });
                        }

                    }

                    reader.Close();

                    return task;
                }
            }
        }

    }
}
