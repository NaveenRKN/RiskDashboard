using RiskDashboard_RESTAPI.Models;
using RistDashboard.Api.Entities.Models;
using RistDashboard.Api.Entities.ViewModel;

namespace RiskDashboard.Api.Services.ServiceContracts
{
    public interface IUserService
    {        
        Task<ActionStatusViewModel> DeleteToDoList(Guid userToDoListId);
        Task<List<UserToDoList>> GetUserToDoList(Guid userId);
        Task<ActionStatusViewModel> SaveToDoList(UserToDoList userToDoList);
        Task<List<EmailNotificationViewModel>> SendEmailNotifications(List<EmailNotificationViewModel> emailNotifications);
        Task<UserModel?> UpdateUserToken(UserModel userModel);
        Task<UserModel?> ValidateUser(string email, string password);
        Task<UserModel?> GetUSerInfo(string email);
    }
}
