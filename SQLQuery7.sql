

-- Get all Notes (works)
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

-- Get a single Note by its Id  (works)
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
WHERE n.id = 2


-- Create a Note (works)
INSERT INTO [Note] (
    Content, 
    CreateDateTime, 
    TaskId)
OUTPUT INSERTED.ID
VALUES (
    'Sweet Christmas', 
    2011-11-11 ,
    2
    )


-- Edit a Note (works)
UPDATE [Note]
SET 
    Content = @Content,
    CreateDateTime = @CreateDateTime, 
    TaskId = @TaskId
WHERE Id = 4


-- Delete a Note (works)
DELETE FROM [Note]
WHERE Id = 4


SELECT * FROM Note