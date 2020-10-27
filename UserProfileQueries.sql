SELECT * FROM UserProfile

SELECT * FROM Task

SELECT * FROM Category

SELECT * FROM Note
                             
-- create userProfile                      
INSERT INTO [UserProfile] 
    (Id, 
    FirebaseUserId,
    DisplayName,
    Email,
    CreateDateTime,
    ImageLocation)
OUTPUT INSERTED.ID
VALUES (4, 
        'lkjhgfdsalkjhgfdsalkjhgfdsal', 
        'asshat',
        'hat@gmail.com',
        2019-01-13,
        null)     
                            
-- edit userProfile
UPDATE [UserProfile]
SET 
    FirebaseUserId = @FirebaseUserId,
    DisplayName = @DisplayName, 
    Email = @Email, 
    CreateDateTime = @CreateDateTime,
	ImageLocation = @ImageLocation
WHERE Id = @id

-- delete userProfile
DELETE FROM [UserProfile]
WHERE Id = 4

SELECT * FROM UserProfile


-- get userProfile by Id
SELECT 
    Id, 
    FirebaseUserId,
    DisplayName,
    Email,
    CreateDateTime,
    ImageLocation
FROM UserProfile
WHERE Id = 2

SELECT 
                            Id, 
                            FirebaseUserId, 
                            DisplayName,
                            Email, 
                            CreateDateTime,
                            ImageLocation
                        FROM UserProfile 
                        WHERE FirebaseUserId ='9AKGqq9p0iU8PEWj0kWnXvbCeXn1'