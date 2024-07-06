Create Procedure Sp_GetRiskIds
As
Begin
	Select Id, Cast(RiskId as varchar) As [UniqueId] From RiskInformation
End;