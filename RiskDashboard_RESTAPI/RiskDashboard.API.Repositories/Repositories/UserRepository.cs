using RiskDashboard.API.Repositories.Repositories.Base;
using RiskDashboard.API.Repositories.RepositoriesContracts;
using RiskDashboard_RESTAPI.Models;
using RiskDashboard_RESTAPI.Models.Common;

namespace RiskDashboard.API.Repositories.Repositories
{
    public class UserRepository : RepositoryBase<UserModel>, IUserRepository
    {
        public UserRepository(DatabaseContext dbContext)
              : base(dbContext)
        {

        }
    }
}
