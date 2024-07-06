Create Procedure Sp_GetLastImportedFileDetails
As
Begin
	Select Top 1 * From FileImportDetails Order by ImportedDate Desc
End;