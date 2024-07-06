using AutoMapper;
using Moq;
using RiskDashboard.Api.Services.ServiceContracts;
using RiskDashboard.Api.Services.Services;
using RiskDashboard.API.Repositories.RepositoriesContracts;
using RiskDashboard.API.Repositories.RepositoriesContracts.Base;
using RistDashboard.Api.Entities.Models;
using Xunit;

namespace Risk.Api.Test
{
    public class RiskInformationServiceTest
    {
        private Mock<IRepositoryWrapper> mockRepoWrapper;
        private Mock<IMapper> mockMapper;
        private IRiskInformationService riskInformationService;

        public RiskInformationServiceTest()
        {
            mockRepoWrapper = new Mock<IRepositoryWrapper>();
            mockMapper = new Mock<IMapper>();

            riskInformationService = new RiskInformationService(mockRepoWrapper.Object, mockMapper.Object);            
        }

        [Fact]
        public async Task GetLastImportedFileDetails_NoFileImported_ReturnsEmpty()
        {
            Mock<IFileImportDetailsRepository> mockFileImportRepository = new Mock<IFileImportDetailsRepository>();
            SetupMockFileImportRepository(mockFileImportRepository, true);

            List<FileImportDetails> importDetails = await riskInformationService.GetLastImportedFileDetails();
            Assert.True(importDetails.Count() == 0);
        }

        [Fact]
        public async Task GetLastImportedFileDetails_FilesImported_ReturnsFileDetails()
        {
            Mock<IFileImportDetailsRepository> mockFileImportRepository = new Mock<IFileImportDetailsRepository>();
            SetupMockFileImportRepository(mockFileImportRepository, false);

            List<FileImportDetails>  importDetails = await riskInformationService.GetLastImportedFileDetails();
            Assert.True(importDetails.Count() > 0);
        }

        [Fact]
        public async Task GetProjectDetails_HasProjects_ReturnsProjectList()
        {
            Mock<IProjectDetailsRepository> mockProjectDetailsRepository = new Mock<IProjectDetailsRepository>();
            SetupMockProjectDetailsRepository(mockProjectDetailsRepository, true);

            List<ProjectDetails> projectDetails = await riskInformationService.GetProjectDetails();
            Assert.True(projectDetails.Count() > 0);
        }

        [Fact]
        public async Task GetProjectDetails_NoProjectsAvailable_ReturnsBlank()
        {
            Mock<IProjectDetailsRepository> mockProjectDetailsRepository = new Mock<IProjectDetailsRepository>();
            SetupMockProjectDetailsRepository(mockProjectDetailsRepository, false);

            List<ProjectDetails> projectDetails = await riskInformationService.GetProjectDetails();
            Assert.True(projectDetails.Count() == 0);
        }

        private List<FileImportDetails> GetFileImportDetails()
        {
            List<FileImportDetails> importDetails = new List<FileImportDetails>();
            importDetails.Add(new FileImportDetails { Id = Guid.NewGuid(), FileName = "TestData.csv", ImportedDate = DateTime.Now });
            return importDetails;
        }

        private List<ProjectDetails>? GetProjectDetails()
        {
            List<ProjectDetails> projectDetails = new List<ProjectDetails>();
            projectDetails.Add(new ProjectDetails { Id = Guid.NewGuid(), Practice = "S2", ProjectName = "Napa" });
            return projectDetails;
        }

        private void SetupMockFileImportRepository(Mock<IFileImportDetailsRepository> mockFileImportRepository, bool blankList)
        {
            List<FileImportDetails>? importDetails = null;
            if (blankList)
            {
                importDetails = new List<FileImportDetails>();
            }
            else
            {
                importDetails = GetFileImportDetails();
            }
            mockRepoWrapper.Setup(repo => repo.FileImportDetailsRepository).Returns(mockFileImportRepository.Object);
            mockFileImportRepository.Setup(x => x.FromSqlRaw(It.IsAny<string>())).ReturnsAsync(importDetails);
        }

        private void SetupMockProjectDetailsRepository(Mock<IProjectDetailsRepository> mockProjectDetailsRepository, bool hasProjects)
        {
            List<ProjectDetails>? projectDetails = null;
            if (hasProjects)
            {
                projectDetails = GetProjectDetails();
            }
            else
            {
                projectDetails = new List<ProjectDetails>();
            }
            mockRepoWrapper.Setup(repo => repo.ProjectDetailsRepository).Returns(mockProjectDetailsRepository.Object);
            mockProjectDetailsRepository.Setup(x => x.GetAll()).ReturnsAsync(projectDetails);
        }        
    }
}
