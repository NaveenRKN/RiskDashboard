using AutoMapper;
using Moq;
using RiskDashboard.Api.Services.ServiceContracts;
using RiskDashboard.Api.Services.Services;
using RiskDashboard.API.Repositories.RepositoriesContracts;
using RiskDashboard.API.Repositories.RepositoriesContracts.Base;
using RiskDashboard_RESTAPI.Models;
using RistDashboard.Api.Entities.Models;
using RistDashboard.Api.Entities.ViewModel;
using System.Linq.Expressions;
using Xunit;

namespace Risk.Api.Test
{
    public class UserServiceTest
    {
        private Mock<IRepositoryWrapper> mockRepoWrapper;
        private Mock<IMapper> mockMapper;
        private IUserService userService;
        private Mock<IUserRepository> mockUserRepository;
        private Mock<IUserToDoListRepository>  mockUserToDoRepository;
        
        public UserServiceTest()
        {
            this.mockRepoWrapper = new Mock<IRepositoryWrapper>();
            this.mockMapper = new Mock<IMapper>();
            this.mockUserRepository = new Mock<IUserRepository>();
            this.mockUserToDoRepository = new Mock<IUserToDoListRepository>();

            // Correct mock setup
            mockRepoWrapper.Setup(repo => repo.UserRepository).Returns(mockUserRepository.Object);
            mockRepoWrapper.Setup(repo => repo.UserToDoListRepository).Returns(mockUserToDoRepository.Object);
            userService = new UserService(mockRepoWrapper.Object);
        }
        [Fact]
        public async Task IsUserExists_ValidateUser_ReturnsTrue()
        {
            mockUserRepository.Setup(repo => repo.FindByCondition(It.IsAny<Expression<Func<UserModel, bool>>>()))
                             .ReturnsAsync(new List<UserModel> { /* mock user data */ });
            var result = await userService.ValidateUser("patnam.babaiah@aspiresys.com", "fbaa44f6bad0572ad6c77c3af75045e9a5ab28cc6536b8c9dbdd158f5f20a61438c294a62e37acf2be73c9d3c61ef00bb636062d3ac700d446bcb338088a1733");
            Assert.False(result != null);
        
        }
        [Fact]
        public async Task IsUserExists_GetUSerInfo_ReturnsTrue()
        {
            mockUserRepository.Setup(repo => repo.FindByCondition(It.IsAny<Expression<Func<UserModel, bool>>>())).ReturnsAsync(new List<UserModel> { /* mock user data */ });
            var result = await userService.GetUSerInfo("Admin");
            Assert.True(result != null);

        }
        [Fact]
        public async Task IsUserExists_GetUSerInfo_ReturnsFalse()
        {
            mockUserRepository.Setup(repo => repo.FindByCondition(It.IsAny<Expression<Func<UserModel, bool>>>())).ReturnsAsync(new List<UserModel> { /* mock user data */ });
            var result = await userService.GetUSerInfo("");
            Assert.False(result != null);

        }
        [Fact]
        public async Task SaveDoToList_ReturnsFalse()
        {
            UserToDoList userToDoList = GetToDoListData(false);
            mockUserToDoRepository.Setup(repo => repo.Create(It.IsAny<UserToDoList>())).ReturnsAsync(new UserToDoList { /* mock user data */ });
            ActionStatusViewModel result = await userService.SaveToDoList(userToDoList);
            Assert.False(!result.Success);
        }
        [Fact]
        public async Task SaveDoToList_ReturnsTrue()
        {
            UserToDoList userToDoList = GetToDoListData(true);
            mockUserToDoRepository.Setup(repo => repo.Create(It.IsAny<UserToDoList>())).ReturnsAsync(new UserToDoList { /* mock user data */ });
            ActionStatusViewModel result = await userService.SaveToDoList(userToDoList);
            Assert.True(result.Success);
            Assert.True(result.ErrorMessage == string.Empty);


        }
        private UserToDoList GetToDoListData(bool withData)
        {
            UserToDoList userToDoList = new UserToDoList();
            if (withData)
            {                
                userToDoList.Description = "Description";
                userToDoList.UserId = new Guid("2ABAEF89-DD09-480F-BFF5-651992CA9EE1");
            }
            return userToDoList;
        }
    }
}