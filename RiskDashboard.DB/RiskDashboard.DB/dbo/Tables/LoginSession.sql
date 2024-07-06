CREATE TABLE [dbo].[LoginSession] (
    [Id]          UNIQUEIDENTIFIER CONSTRAINT [DF_LoginSession_Id] DEFAULT (newsequentialid()) NOT NULL,
    [SessionId]   VARCHAR (200)    NOT NULL,
    [UserId]      VARCHAR (200)    NULL,
    [PublicKey]   VARCHAR (200)    NULL,
    [PrivateKey]  VARCHAR (200)    NULL,
    [DeviceIP]    VARCHAR (200)    NULL,
    [RequestPath] NVARCHAR (500)   NULL,
    [CreatedDate] DATETIME         NULL,
    CONSTRAINT [PK_LoginSession] PRIMARY KEY CLUSTERED ([Id] ASC)
);

