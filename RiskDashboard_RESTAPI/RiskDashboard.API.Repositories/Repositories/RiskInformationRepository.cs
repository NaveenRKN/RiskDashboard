using RiskDashboard.API.Repositories.Repositories.Base;
using RiskDashboard.API.Repositories.RepositoriesContracts;
using RiskDashboard_RESTAPI.Models.Common;
using RistDashboard.Api.Entities.Models;

namespace RiskDashboard.API.Repositories.Repositories
{
    public class RiskInformationRepository : RepositoryBase<RiskInformation>, IRiskInformationRepository
    {
        public RiskInformationRepository(DatabaseContext dbContext)
              : base(dbContext)
        {

        }
    }
}
