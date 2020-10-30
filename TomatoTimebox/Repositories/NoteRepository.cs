using System;
using System.Collections.Generic;
using System.Linq;
using TomatoTimebox.Models;
using TomatoTimebox.Repositories;
using TomatoTimebox.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace TomatoTimebox.Repositories
{
    public class NoteRepository : BaseRepository, INoteRepository
    {
        public NoteRepository(IConfiguration config) : base(config) { }

        // Helper method that defines the new object and stores it in  
        // the NewNoteFromReader variable.

        private Note NewNoteFromReader(SqlDataReader reader)
        {
            return new Note()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Content = reader.GetString(reader.GetOrdinal("Content")),
                CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateNoteDateTime")),
                TaskId = reader.GetInt32(reader.GetOrdinal("TaskId")),
                Task = new Task()
                { 
                    Id = reader.GetInt32(reader.GetOrdinal("TaskId")),
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
                        CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateUserProfileDateTime")),
                        ImageLocation = DbUtils.GetNullableString(reader, "ImageLocation"),
                    }
                }
            };
        }

        //Get all Notes
        public List<Note> GetAllNotes()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT  
                            n.Id,
                            n.Content,
                            n.[CreateDateTime] AS CreateNoteDateTime,
                            n.TaskId,

                            t.[Name] AS TaskName, 
                            t.Description, 
                            t.IsFinished, 
                            t.CategoryId,
                            t.UserProfileId,
                    
                            c.[Name] AS CategoryName,

                            u.FirebaseUserId, 
                            u.DisplayName,
                            u.Email,
                            u.[CreateDateTime] AS CreateUserProfileDateTime,
                            u.ImageLocation
                              
                        FROM Note n
                        LEFT JOIN Task t ON n.TaskId = t.Id
                        LEFT JOIN Category c ON t.CategoryId = c.Id
                        LEFT JOIN UserProfile u ON t.UserProfileId = u.Id";

                    var reader = cmd.ExecuteReader();

                    var notes = new List<Note>();

                    while (reader.Read())
                    {
                        notes.Add(NewNoteFromReader(reader));
                    }

                    reader.Close();

                    return notes;
                }
            };
        }

        // Get a single Note by its Id
        public Note GetNoteById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT  
                            n.Id,
                            n.Content,
                            n.[CreateDateTime] AS CreateNoteDateTime,
                            n.TaskId,

                            t.[Name] AS TaskName, 
                            t.Description, 
                            t.IsFinished, 
                            t.CategoryId,
                            t.UserProfileId,
                    
                            c.[Name] AS CategoryName,

                            u.FirebaseUserId, 
                            u.DisplayName,
                            u.Email,
                            u.[CreateDateTime] AS CreateUserProfileDateTime,
                            u.ImageLocation
                              
                        FROM Note n
                        LEFT JOIN Task t ON n.TaskId = t.Id
                        LEFT JOIN Category c ON t.CategoryId = c.Id
                        LEFT JOIN UserProfile u ON t.UserProfileId = u.Id
                        WHERE n.id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    Note note = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        note = NewNoteFromReader(reader);
                    }
                    reader.Close();

                    return note;
                }
            }
        }

        // Create a Note
        public void Add(Note note)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO [Note] (
                            Content, 
                            CreateDateTime, 
                            TaskId)
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Content, 
                            @CreateDateTime,
                            @TaskId
                            )";
                    DbUtils.AddParameter(cmd, "@Content", note.Content);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", note.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@TaskId", note.TaskId);

                    note.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        // Edit a Note
        public void Update(Note note)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE [Note]
                        SET 
                            Content = @Content, 
                            CreateDateTime = @CreateDateTime,
                            TaskId = @TaskId
                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@Id", note.Id);
                    cmd.Parameters.AddWithValue("@Content", note.Content);
                    cmd.Parameters.AddWithValue("@CreateDateTime", note.CreateDateTime);
                    cmd.Parameters.AddWithValue("@TaskId", note.TaskId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        //Delete a Note
        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM [Note]
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }

        }
    }
}
