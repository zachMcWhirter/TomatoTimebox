-- Get All Categories (works)
SELECT 
    Id, 
    [Name] 
FROM Category 
ORDER BY Name

-- Get Category by Id (works)
SELECT 
    Id, 
    Name
FROM Category 
WHERE Id = 9


-- Add a Category (Works)
INSERT INTO Category (Name)
OUTPUT INSERTED.ID
VALUES ( 'Do it' )


-- Edit Category (works)
UPDATE Category
SET Name = 'Foolishness'
WHERE Id = 8

-- Delete a Category
DELETE Category
WHERE Id = 12

