using RistDashboard.Api.Entities.Models;
using RistDashboard.Api.Entities.ViewModel;

namespace RiskDashboard.Api.Services.ServiceContracts
{
    public interface IRiskInformationService
    {
        Task<List<FileImportDetails>> GetLastImportedFileDetails();
        Task<List<ProjectDetails>> GetProjectDetails();
        Task<List<RiskInformation>?> GetRiskInformation(int? startYear, int? startMonth, int? startDate, int? endYear, int? endMonth, int? endDate, string? riskType);
        Task<bool> SaveRiskDetails(List<RiskDashboardViewModel> riskDetails, string fileName);
    }
}
