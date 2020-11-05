USE [TomatoTimeBox];


insert into [Note] ([Id], [Content], [CreateDateTime], [TaskId]) 
values (1, 'Im out', '2020-09-23', 1),
(2, 'Winning!', '2020-07-27', 2),
(3, 'Bad guys died', '2020-05-15', 3)

GO


insert into [Task] ([Id], [Name], [UserProfileId], [Description], [CategoryId], [IsFinished]) 
values (1, 'snakePlissken'), (2, 'Science'), (3, 'Social Studies'), (4, 'ELA'), (5, 'Music'),
	   (6, 'PE'), (7, 'Art'), (8, 'Chores'), (9, 'Martial Arts')

select * from UserProfile