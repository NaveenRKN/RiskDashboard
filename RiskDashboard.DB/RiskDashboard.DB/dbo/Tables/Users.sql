CREATE TABLE [dbo].[Users] (
    [Id]              UNIQUEIDENTIFIER CONSTRAINT [DF_Users_id] DEFAULT (newid()) NOT NULL,
    [FirstName]       VARCHAR (500)    NULL,
    [LastName]        VARCHAR (250)    NULL,
    [Email]           VARCHAR (50)     NULL,
    [CreatedDate]     DATETIME         NULL,
    [UpdatedDate]     DATETIME         NULL,
    [Password]        NVARCHAR (1024)  NULL,
    [IsActive]        BIT              DEFAULT ('TRUE') NULL,
    [AuthToken]       NVARCHAR (1024)  NULL,
    [TokenExpiryTime] DATETIME         NULL,
    CONSTRAINT [PK_Users_id] PRIMARY KEY CLUSTERED ([Id] ASC)
);

