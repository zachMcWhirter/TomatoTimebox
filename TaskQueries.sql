
-- get all (tasks)
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
WHERE t.Id = 2


INSERT INTO [Task] (
    [Name], 
    Description, 
    IsFinished, 
    CategoryId,
    UserProfileId)
OUTPUT INSERTED.ID
VALUES (
    'z', 
    'z',
    0,
    9,
    3
    )


-- Edit a task (works)
UPDATE [Task]
SET 
    --Name = 'Take a break',
    --Description = 'Go outside and walk around' 
    IsFinished = 1 
 --   CategoryId = @CategoryId,
	--UserProfileId = @UserProfileId
WHERE Id = 7

-- Delete a task (works)
DELETE FROM [Task]
WHERE Id = 7

