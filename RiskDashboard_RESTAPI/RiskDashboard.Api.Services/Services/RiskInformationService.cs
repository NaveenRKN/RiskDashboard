using AutoMapper;
using RiskDashboard.Api.Services.Constants;
using RiskDashboard.Api.Services.ServiceContracts;
using RiskDashboard.API.Repositories.RepositoriesContracts.Base;
using RistDashboard.Api.Entities.Models;
using RistDashboard.Api.Entities.ViewModel;
using static RiskDashboard_RESTAPI.Enums.RiskDashboardType;

namespace RiskDashboard.Api.Services.Services
{
    public class RiskInformationService : IRiskInformationService
    {
        private readonly IMapper _mapper;
        private readonly IRepositoryWrapper _repoWrapper;
        public RiskInformationService(IRepositoryWrapper repoWrapper, IMapper mapper)
        {
            _repoWrapper = repoWrapper;
            _mapper = mapper;
        }

        public async Task<List<FileImportDetails>> GetLastImportedFileDetails()
        {
            List<FileImportDetails> importDetails = await _repoWrapper.FileImportDetailsRepository.FromSqlRaw("Sp_GetLastImportedFileDetails");
            return importDetails;
        }

        public async Task<List<ProjectDetails>> GetProjectDetails()
        {
            List<ProjectDetails> projects = await _repoWrapper.ProjectDetailsRepository.GetAll();
            return projects;
        }

        public async Task<List<RiskInformation>?> GetRiskInformation(int? startYear, int? startMonth, int? startDate, int? endYear, int? endMonth, int? endDate, string? riskType)
        {
            List<RiskInformation>? risks = null;
            DateTime yearStart = new DateTime();
            DateTime yearEnd = new DateTime();
            bool isRiskTypeNotNull = false;
            bool isYearStartNotNull = false;
            bool isYearEndNotNull = false;
            if ((startYear != null && startMonth != null && startDate != null) && (endYear != null && endMonth != null && endDate != null))
            {
                yearStart = new DateTime(startYear.Value, startMonth.Value, startDate.Value);
                yearEnd = new DateTime(endYear.Value, endMonth.Value, endDate.Value);
                isYearStartNotNull = true;
                isYearEndNotNull = true;
            }
            if (!string.IsNullOrEmpty(riskType))
            {
                isRiskTypeNotNull = true;
            }
            if (!isRiskTypeNotNull && !isYearStartNotNull && !isYearEndNotNull)
            {
                risks = await _repoWrapper.RiskInformationRepository.GetAll();
            }
            else if (!isRiskTypeNotNull && (isYearStartNotNull && isYearEndNotNull))
            {
               risks = await _repoWrapper.RiskInformationRepository.FindByCondition(x => ((x.IdentifiedDate >= yearStart) && (x.IdentifiedDate <= yearEnd)));
            }
            else if (isRiskTypeNotNull && isYearStartNotNull && isYearEndNotNull)
            {
                risks = await GetRiskInformationByRiskTypeAndDate(riskType, yearStart, yearEnd);
            }
            if (risks != null)
            {
                List<ProjectDetails> projectDetails = await _repoWrapper.ProjectDetailsRepository.GetAll();
                PopulateProjectDetails(risks, projectDetails);
            }
            return risks;
        }        
        
        public async Task<bool> SaveRiskDetails(List<RiskDashboardViewModel> riskDetails, string fileName)
        {
            List<ProjectDetailsViewModel> projectInfo = ReadProjectDetails(riskDetails);
            if (projectInfo != null && projectInfo.Count > 0)
            {
                List<RowIdentifier> projects = await CreateProjectsIfNotExists(projectInfo);
                await CreateOrUpdateRisks(riskDetails, projects, fileName);
            }
            return true;
        }

        private static Tuple<int, int> CalculateMonthsAndDaysDifference(DateTime startDate, DateTime endDate)
        {
            if (startDate > endDate)
            {
                // Swap the dates if startDate is later than endDate
                DateTime temp = startDate;
                startDate = endDate;
                endDate = temp;
            }

            // Calculate the difference in months and days
            int monthsDifference = (endDate.Year - startDate.Year) * 12 + endDate.Month - startDate.Month;
            int daysDifference = endDate.Day - startDate.Day;

            // Adjust for days within the month
            if (daysDifference < 0)
            {
                monthsDifference--;
                daysDifference += DateTime.DaysInMonth(startDate.Year, startDate.Month);
            }

            return new Tuple<int, int>(monthsDifference, daysDifference);
        }

        private async Task CreateOrUpdateRisks(List<RiskDashboardViewModel> riskDetails, List<RowIdentifier> projects, string fileName)
        {
            List<RiskInformation> newRisks = new List<RiskInformation>();
            List<RiskInformation> existsRisks = new List<RiskInformation>();
            List<RowIdentifier> existingRiskIds = await _repoWrapper.RowIdentifierRepository.FromSqlRaw("Sp_GetRiskIds");
            foreach (RiskDashboardViewModel risk in riskDetails)
            {
                RowIdentifier? existingRiskDetails = existingRiskIds.Find(x => x.UniqueId == risk.RiskId.ToString());
                if (risk.RiskId != null && existingRiskDetails == null)
                {
                    RiskInformation riskInfo = _mapper.Map<RiskInformation>(risk);
                    riskInfo.ProjectDetailsId = projects.Where(x => x.UniqueId == risk.ProjectCode).Select(x => x.Id).FirstOrDefault();
                    newRisks.Add(riskInfo);
                }
                else if (risk.RiskId != null && existingRiskDetails != null)
                {
                    RiskInformation existingRisk = await GetUpdatedRisk(risk, projects, existingRiskDetails);
                    existsRisks.Add(existingRisk);
                }
            }
            if (newRisks.Count > 0)
            {
                await _repoWrapper.RiskInformationRepository.CreateRange(newRisks.ToArray());
            }
            if (existsRisks.Count > 0)
            {
                await _repoWrapper.RiskInformationRepository.UpdateRange(existsRisks.ToArray());
            }
            await SaveImportedFileDetails(fileName, newRisks.Count, existsRisks.Count);
        }

        private async Task<List<RowIdentifier>> CreateProjectsIfNotExists(List<ProjectDetailsViewModel> projects)
        {
            List<ProjectDetails> newProjects = new List<ProjectDetails>();
            List<RowIdentifier> projectIds = await _repoWrapper.RowIdentifierRepository.FromSqlRaw("Sp_GetProjectIds");
            foreach (ProjectDetailsViewModel project in projects)
            {
                if (!projectIds.Any(x => x.UniqueId == project.ProjectCode))
                {
                    newProjects.Add(_mapper.Map<ProjectDetails>(project));
                }
            }

            if (newProjects.Count > 0)
            {
                newProjects = await _repoWrapper.ProjectDetailsRepository.CreateRange(newProjects.ToArray());
                projectIds.AddRange(newProjects.Select(x => new RowIdentifier { Id = x.Id, UniqueId = x.ProjectCode }).ToList());
            }
            return projectIds;
        }

        private async Task<List<RiskInformation>?> GetRiskInformationByRiskTypeAndDate(string? riskType, DateTime? yearStart, DateTime? yearEnd)
        {
            List<RiskInformation>? risks = null;
            List<string> valuesToCheck;
            if (!string.IsNullOrEmpty(riskType))
            {
                if ((int)RiskType.ISMS == Convert.ToInt32(riskType))
                {
                    risks = await _repoWrapper.RiskInformationRepository.FindByCondition(x => ((x.IdentifiedDate >= yearStart) && (x.IdentifiedDate <= yearEnd))
                        && (x.Type != null && x.Type.Contains(RiskDashboardConstants.ISMS)));
                }
                else if ((int)RiskType.Privacy == Convert.ToInt32(riskType))
                {
                    valuesToCheck = RiskDashboardConstants.Privacy.Split(',').ToList();
                    risks = await _repoWrapper.RiskInformationRepository.FindByCondition(x => ((x.IdentifiedDate >= yearStart) && (x.IdentifiedDate <= yearEnd))
                        && (x.Type != null && valuesToCheck.Contains(x.Type)));
                }
                else if ((int)RiskType.QMS == Convert.ToInt32(riskType))
                {
                    valuesToCheck = RiskDashboardConstants.QMS.Split(',').ToList();
                    risks = await _repoWrapper.RiskInformationRepository.FindByCondition(x => ((x.IdentifiedDate >= yearStart) && (x.IdentifiedDate <= yearEnd))
                        && (x.Type != null && valuesToCheck.Contains(x.Type)));
                }
            }
            return risks;
        }

        private async Task<RiskInformation> GetUpdatedRisk(RiskDashboardViewModel risk, List<RowIdentifier> projects, RowIdentifier existingRiskDetails)
        {
            RiskInformation existingRisk = await _repoWrapper.RiskInformationRepository.Get(existingRiskDetails.Id);
            existingRisk.Type = risk.Type;
            existingRisk.SubType = risk.SubType;
            existingRisk.Description = risk.Description;
            existingRisk.Status = risk.Status;
            existingRisk.AnalysisImpact = risk.AnalysisImpact;
            existingRisk.AnalysisProbability = risk.AnalysisProbability;
            existingRisk.RiskRating = risk.RiskRating;
            existingRisk.RiskSource = risk.RiskSource;
            existingRisk.ContingencyPlan = risk.ContingencyPlan;
            existingRisk.MitigationPlan = risk.MitigationPlan;
            existingRisk.ReviewImpact = risk.ReviewImpact;
            existingRisk.ReviewRating = risk.ReviewRating;
            existingRisk.ReviewProbability = risk.ReviewProbability;
            if (existingRisk.TargetClosuerDate != risk.TargetClosuerDate)
            {
                existingRisk.IsEmailSend = null;
            }
            existingRisk.TargetClosuerDate = risk.TargetClosuerDate;
            existingRisk.UpdatedDate = DateTime.Now;
            existingRisk.RiskStatus = risk.RiskStatus;
            existingRisk.Owner = risk.Owner;
            existingRisk.ProjectDetailsId = projects.Where(x => x.UniqueId == risk.ProjectCode).Select(x => x.Id).FirstOrDefault();
            return existingRisk;
        }

        private void PopulateProjectDetails(List<RiskInformation> risks, List<ProjectDetails> projects)
        {
            foreach (ProjectDetails project in projects)
            {
                foreach (RiskInformation risk in risks)
                {
                    if (risk.ProjectDetailsId == project.Id)
                    {
                        risk.ProjectName = project.ProjectName;
                        risk.Practice = project.Practice;
                        if (risk.IdentifiedDate != null)
                        {
                            Tuple<int, int> outPutVal = CalculateMonthsAndDaysDifference(risk.IdentifiedDate.Value, DateTime.Now.Date);
                            risk.AgeInMonths = outPutVal.Item1;
                            risk.AgeInDays = outPutVal.Item2;
                        }
                    }
                }
            }
        }

        private List<ProjectDetailsViewModel> ReadProjectDetails(List<RiskDashboardViewModel> riskDetails)
        {
            List<ProjectDetailsViewModel> projectInfo =
                riskDetails.Select(i => new ProjectDetailsViewModel
                {
                    ProjectName = i.ProjectName,
                    ProjectCode = i.ProjectCode,
                    Practice = i.Practice
                }).DistinctBy(p => p.ProjectCode).ToList();
            return projectInfo;
        }

        private async Task SaveImportedFileDetails(string fileName, int noOfRisksCreated, int noOfRisksUpdated)
        {
            FileImportDetails importDetails = new FileImportDetails
            {
                FileName = fileName,
                NoOfRecordsCreated = noOfRisksCreated,
                NoOfRecordsUpdated = noOfRisksUpdated,
                ImportedDate = DateTime.Now
            };
            await _repoWrapper.FileImportDetailsRepository.Create(importDetails);
        }
    }
}
