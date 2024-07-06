CREATE TABLE [dbo].[UserToDoList] (
    [Id]          UNIQUEIDENTIFIER CONSTRAINT [DF_UserToDoList_id] DEFAULT (newid()) NOT NULL,
    [Description] VARCHAR (500)    NULL,
    [UserId]      UNIQUEIDENTIFIER NOT NULL,
    [IsActive]    BIT              DEFAULT ('TRUE') NULL,
    [CreatedDate] DATETIME         NULL,
    [UpdatedDate] DATETIME         NULL,
    CONSTRAINT [PK_UserToDoList_id] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_UserToDoList_Users] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users] ([Id])
);

