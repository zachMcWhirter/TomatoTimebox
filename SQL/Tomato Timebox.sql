USE [master]

IF db_id('TomatoTimebox') IS NULL
  CREATE DATABASE [TomatoTimebox]
GO

USE [TomatoTimebox];
GO

DROP TABLE IF EXISTS [userProfile];
DROP TABLE IF EXISTS [task];
DROP TABLE IF EXISTS [category];
DROP TABLE IF EXISTS [note];
GO

CREATE TABLE [userProfile] (
  [id] int PRIMARY KEY IDENTITY,
  [FirebaseUserId] nvarchar(255) NOT NULL,
  [DisplayName] nvarchar(255) NOT NULL,
  [CreateDateTime] datetime NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [ImageLocation] nvarchar(255)
)
GO

CREATE TABLE [task] (
  [id] int PRIMARY KEY IDENTITY,
  [userProfileId] int NOT NULL,
  [name] nvarchar(255) NOT NULL,
  [description] nvarchar(255) NOT NULL,
  [categoryId] int NOT NULL,
  [isFinished] bit NOT NULL
)
GO

CREATE TABLE [category] (
  [id] int PRIMARY KEY IDENTITY,
  [name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [note] (
  [id] int PRIMARY KEY IDENTITY,
  [Content] nvarchar(255) NOT NULL,
  [CreateDateTime] datetime  NOT NULL,
  [taskId] int NOT NULL
)
GO

ALTER TABLE [task] ADD FOREIGN KEY ([userProfileId]) REFERENCES [userProfile] ([id])
GO

ALTER TABLE [task] ADD FOREIGN KEY ([categoryId]) REFERENCES [category] ([id])
GO

ALTER TABLE [note] ADD FOREIGN KEY ([taskId]) REFERENCES [task] ([id])
GO
