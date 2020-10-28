SELECT * from Task



-- get all Tasks (works)
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


-- get task by Id (works)
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
WHERE t.Id = 7

-- Add a Task (works)
INSERT INTO [Task] (
    [Name], 
    Description, 
    IsFinished, 
    CategoryId,
    UserProfileId)
OUTPUT INSERTED.ID
VALUES (
    'zzz', 
    'zzz',
    1,
    5,
    2
    )


-- Edit a task (works)
UPDATE [Task]
SET 
    Name = 'new task!!',
    Description = 'something!',
    IsFinished = 0,
    CategoryId = 3
	--UserProfileId = @UserProfileId
WHERE Id = 7

-- Delete a task (works)
DELETE FROM [Task]
WHERE Id = 6

INSERT INTO Category (Name)
                        OUTPUT INSERTED.ID
                        VALUES ('Cooking')

-- Get all Tasks with their Notes (works)
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
ORDER BY n.CreateDateTime DESC



-- Get all the notes for single Task By TaskId()
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
WHERE t.Id = 1
ORDER BY n.CreateDateTime DESC


SELECT * from Task

-- Get all Tasks For a single user by UserProfileId
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
WHERE u.id = 1

-- Get all Tasks For a single user by UserProfileId Again
SELECT
    t.Id,
    t.[Name] AS TaskName,
    t.Description,
    t.IsFinished,
    t.CategoryId,
    t.UserProfileId,

    c.[Name] AS CategoryName

FROM Task t
LEFT JOIN Category c ON t.CategoryId = c.Id
WHERE t.UserProfileId = 1


-- Get all Tasks with their Notes For a single user by UserProfileId()
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
WHERE t.UserProfileId = 1
ORDER BY n.CreateDateTime DESC