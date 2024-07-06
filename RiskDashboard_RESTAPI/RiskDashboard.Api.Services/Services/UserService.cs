using AutoMapper;
using RiskDashboard.Api.Services.Constants;
using RiskDashboard.Api.Services.Helper;
using RiskDashboard.Api.Services.ServiceContracts;
using RiskDashboard.API.Repositories.RepositoriesContracts.Base;
using RiskDashboard_RESTAPI.Models;
using RistDashboard.Api.Entities;
using RistDashboard.Api.Entities.Models;
using RistDashboard.Api.Entities.ViewModel;

namespace RiskDashboard.Api.Services.Services
{
    public class UserService : IUserService
    {
        private readonly IRepositoryWrapper _repoWrapper;
        public UserService(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }

        public async Task<ActionStatusViewModel> DeleteToDoList(Guid userToDoListId)
        {
            ActionStatusViewModel actionStatus = new ActionStatusViewModel { Success = false, ErrorMessage = "" };
            try
            {
                if (userToDoListId != Guid.Empty)
                {
                    await _repoWrapper.UserToDoListRepository.Delete(userToDoListId);
                    actionStatus.Success = true;
                }
            }
            catch (Exception)
            {
                actionStatus.Success = false;
                actionStatus.ErrorMessage = "Error occured while deleting the User ToDoList.";
            }
            return actionStatus;
        }

        public async Task<UserModel?> ValidateUser(string email, string password)
        {
            List<UserModel> users = await _repoWrapper.UserRepository.FindByCondition(x => x.Email == email && x.Password == password && x.IsActive);
            if (users != null && users.Count > 0)
            {
                return users[0];
            }
            return null;
        }

        public async Task<List<UserToDoList>> GetUserToDoList(Guid userId)
        {
            List<UserToDoList> userToDoList = await _repoWrapper.UserToDoListRepository.FindByCondition(u => u.UserId == userId);
            return userToDoList;
        }

        public async Task<ActionStatusViewModel> SaveToDoList(UserToDoList userToDoList)
        {
            ActionStatusViewModel actionStatus = new ActionStatusViewModel { Success = false, ErrorMessage = "" };
            try
            {
                if (userToDoList != null)
                {
                    if (userToDoList.Id != Guid.Empty)
                    {
                        userToDoList.UpdatedDate = DateTime.Now;
                        await _repoWrapper.UserToDoListRepository.Update(userToDoList);
                        actionStatus.Success = true;
                    }
                    else
                    {
                        userToDoList.CreatedDate = DateTime.Now;
                        await _repoWrapper.UserToDoListRepository.Create(userToDoList);
                        actionStatus.Success = true;
                    }
                }
            }
            catch
            {
                actionStatus.Success = false;
                actionStatus.ErrorMessage = "Error occured while Adding/Modifying the User ToDoList.";
            }
            return actionStatus;
        }
        
        public async Task<List<EmailNotificationViewModel>> SendEmailNotifications(List<EmailNotificationViewModel> emailNotifications)
        {
            List<EmailNotificationViewModel> emailNotificationModel = new List<EmailNotificationViewModel>();
            string? emailBody = null;
            foreach (var model in emailNotifications)
            {
                if(model.EmailFor != null && model.EmailFor == "T")
                {
                    emailBody = AppSettings.EmailBody;
                }
                else if (model.EmailFor != null && model.EmailFor == "A")
                {
                    emailBody = AppSettings.ApprovalEmailbody;
                }
                EmailNotificationViewModel emailNotify = await ServiceHelper.SendEmail(model.Owner + RiskDashboardConstants.EmailDomain, AppSettings.EmailSubject, emailBody, model.Owner, model.RiskId, model.TargetClosureDate);
                await UpdateRiskInfo(emailNotify.RiskId, emailNotify.IsEmailSend);
                emailNotificationModel.Add(emailNotify);
            }
            return emailNotificationModel;
        }

        public async Task<UserModel?> UpdateUserToken(UserModel userModel)
        {
            if (userModel != null)
            {
                userModel = await _repoWrapper.UserRepository.Update(userModel);
            }
            return userModel;
        }

        private async Task UpdateRiskInfo(int? riskId, bool? isEmailSend)
        {
            if (riskId != null)
            {
                List<RiskInformation> riskInformation = await _repoWrapper.RiskInformationRepository.FindByCondition(r => r.RiskId == riskId.Value);
                if (riskInformation != null && riskInformation.Count > 0)
                {
                    riskInformation[0].UpdatedDate = DateTime.Now;
                    riskInformation[0].IsEmailSend = isEmailSend;
                    await _repoWrapper.RiskInformationRepository.Update(riskInformation[0]);
                }
            }
        }
        public async Task<UserModel?> GetUSerInfo(string email)
        { 
            return await Task.Run(() =>
            {
                UserModel userInfo = _repoWrapper.UserRepository.FindByCondition(u => u.Email == email).Result.FirstOrDefault();
                return userInfo;
            });
        }
    }

}
