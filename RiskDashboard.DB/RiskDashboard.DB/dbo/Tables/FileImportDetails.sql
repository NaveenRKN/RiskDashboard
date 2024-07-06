CREATE TABLE [dbo].[FileImportDetails] (
    [Id]                 UNIQUEIDENTIFIER CONSTRAINT [DF_FileImportDetails_id] DEFAULT (newid()) NOT NULL,
    [FileName]           VARCHAR (100)    NULL,
    [ImportedDate]       DATETIME         NULL,
    [NoOfRecordsCreated] INT              NULL,
    [NoOfRecordsUpdated] INT              NULL,
    [ErrorDetails]       VARCHAR (MAX)    NULL,
    [UpdatedBy]          UNIQUEIDENTIFIER NULL,
    CONSTRAINT [PK_FileImportDetails_id] PRIMARY KEY CLUSTERED ([Id] ASC)
);

