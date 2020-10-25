﻿using Microsoft.Data.SqlClient;
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
        // the NewUserProfileFromReader variable.
        private Task NewTaskFromReader(SqlDataReader reader)

        {
            return new Task()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Name = reader.GetString(reader.GetOrdinal("Name")),
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
                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                    FirebaseUserId = reader.GetString(reader.GetOrdinal("FirebaseUserId")),
                    DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                    Email = reader.GetString(reader.GetOrdinal("Email")),
                    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                    ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation")),
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
    }
}