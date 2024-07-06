Create Procedure Sp_GetProjectIds
As
Begin
	Select Id, ProjectCode As [UniqueId] From ProjectDetails
End;