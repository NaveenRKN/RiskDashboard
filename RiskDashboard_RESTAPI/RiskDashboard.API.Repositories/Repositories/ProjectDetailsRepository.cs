using RiskDashboard.API.Repositories.Repositories.Base;
using RiskDashboard.API.Repositories.RepositoriesContracts;
using RiskDashboard_RESTAPI.Models.Common;
using RistDashboard.Api.Entities.Models;

namespace RiskDashboard.API.Repositories.Repositories
{
    public class ProjectDetailsRepository : RepositoryBase<ProjectDetails>, IProjectDetailsRepository
    {
        public ProjectDetailsRepository(DatabaseContext dbContext)
              : base(dbContext)
        {

        }
    }
}
