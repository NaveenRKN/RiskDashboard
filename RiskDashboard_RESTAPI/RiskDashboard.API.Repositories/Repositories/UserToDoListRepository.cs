using RiskDashboard.API.Repositories.Repositories.Base;
using RiskDashboard.API.Repositories.RepositoriesContracts;
using RiskDashboard_RESTAPI.Models.Common;
using RistDashboard.Api.Entities.Models;

namespace RiskDashboard.API.Repositories.Repositories
{
    public class UserToDoListRepository : RepositoryBase<UserToDoList>, IUserToDoListRepository
    {
        public UserToDoListRepository(DatabaseContext dbContext)
              : base(dbContext)
        {

        }
    }
}
