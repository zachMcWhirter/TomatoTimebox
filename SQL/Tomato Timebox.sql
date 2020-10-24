CREATE TABLE [userProfile] (
  [id] int PRIMARY KEY,
  [FirebaseUserId] nvarchar(255),
  [DisplayName] nvarchar(255),
  [CreateDateTime] datetime,
  [Email] nvarchar(255),
  [ImageLocation] nvarchar(255)
)
GO

CREATE TABLE [task] (
  [id] int PRIMARY KEY,
  [userProfileId] int,
  [name] nvarchar(255),
  [description] nvarchar(255),
  [categoryId] int,
  [isFinished] boolean
)
GO

CREATE TABLE [category] (
  [id] int PRIMARY KEY,
  [name] nvarchar(255)
)
GO

CREATE TABLE [note] (
  [id] int PRIMARY KEY,
  [Content] nvarchar(255),
  [CreateDateTime] datetime,
  [taskId] int
)
GO

ALTER TABLE [note] ADD FOREIGN KEY ([taskId]) REFERENCES [task] ([id])
GO

ALTER TABLE [task] ADD FOREIGN KEY ([userProfileId]) REFERENCES [userProfile] ([id])
GO

ALTER TABLE [task] ADD FOREIGN KEY ([categoryId]) REFERENCES [category] ([id])
GO
