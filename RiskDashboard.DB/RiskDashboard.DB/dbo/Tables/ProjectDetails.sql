CREATE TABLE [dbo].[ProjectDetails] (
    [Id]          UNIQUEIDENTIFIER CONSTRAINT [DF_ProjectDetails_id] DEFAULT (newid()) NOT NULL,
    [ProjectName] VARCHAR (500)    NULL,
    [ProjectCode] VARCHAR (250)    NULL,
    [Practice]    VARCHAR (50)     NULL,
    [Owner]       VARCHAR (200)    NULL,
    [CreatedDate] DATETIME         NULL,
    [UpdatedDate] DATETIME         NULL,
    CONSTRAINT [PK_ProjectDetails_id] PRIMARY KEY CLUSTERED ([Id] ASC)
);

