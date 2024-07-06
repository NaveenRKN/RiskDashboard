using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RiskDashboard.Api.Services.ServiceContracts;
using RiskDashboard_RESTAPI.Models;
using RistDashboard.Api.Entities.Models;
using RistDashboard.Api.Entities.ViewModel;

namespace RiskDashboard_RESTAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ILog _logger;
        private readonly ITokenService _tokenService;
        public UserController(IUserService userService, ILog logger, ITokenService tokenService)
        {
            _userService = userService;
            _logger = logger;
            _tokenService = tokenService;
        }

        /// <summary>
        /// Authenticate user and generate oauth token
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> AuthenticateUser()
        {
            try
            {                
                IFormCollection requestForm = await Request.ReadFormAsync();
                string emailId = requestForm["emailId"].ToString();
                string password = requestForm["password"].ToString();

                UserModel? user = await _userService.ValidateUser(emailId, password);
                if (user is null)
                {
                    return Unauthorized("Incorrect username or password!");
                }
                else
                {
                    var accessToken = await _tokenService.GenerateNewAccessToken(user);
                    var refreshToken = await _tokenService.GenerateRefreshToken();
                    user.AuthToken = refreshToken.ToString();
                    user.TokenExpiryTime = DateTime.Now.AddDays(7);
                    await _userService.UpdateUserToken(user);

                    return Ok(new AuthenticatedResponse
                    {
                        AceessToken = accessToken,
                        RefreshToken = refreshToken,
                        UserId = user.Id
                    });
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex.ToString());
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Refresh(TokenApiModel tokenApiModel)
        {
            try
            {
                if (tokenApiModel is null || tokenApiModel.RefreshToken == null)
                {
                    return BadRequest("Invalid request");
                }
                else
                {
                    var authenticatedResponse = await _tokenService.VerifyRefreshTokenAndReGenerate(tokenApiModel.RefreshToken);

                    if (authenticatedResponse == null)
                    {
                        return NoContent();
                    }
                    else
                    {
                        return Ok(authenticatedResponse);
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex.ToString());
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddOrUpdateToDoList(UserToDoList userToDoList)
        {
            try
            {
                if (userToDoList is null)
                    return BadRequest("Invalid request");
                var values = await _userService.SaveToDoList(userToDoList);
                if (values == null) return NoContent();
                return Ok(values);
            }
            catch (Exception ex)
            {
                _logger.Error(ex.ToString());
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserToDoList(Guid userId)
        {
            try
            {
                if (userId == Guid.Empty)
                    return BadRequest("Invalid request");
                var values = await _userService.GetUserToDoList(userId);
                if (values == null) return NoContent();
                return Ok(values);
            }
            catch (Exception ex)
            {
                _logger.Error(ex.ToString());
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete("{userToDoListId}")]
        public async Task<IActionResult> DeleteToDoList(Guid userToDoListId)
        {
            try
            {
                if (userToDoListId == Guid.Empty)
                    return BadRequest("Invalid request");
                var values = await _userService.DeleteToDoList(userToDoListId);
                if (values == null) return NoContent();
                return Ok(values);
            }
            catch (Exception ex)
            {
                _logger.Error(ex.ToString());
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        
        [HttpPost]
        public async Task<IActionResult> SendEmailNotification(List<EmailNotificationViewModel> emailNotifications)
        {
            try
            {
                if (emailNotifications.Count == 0)
                    return BadRequest("Invalid request");
                var values = await _userService.SendEmailNotifications(emailNotifications);
                if (values == null) return NoContent();
                return Ok(values);
            }
            catch (Exception ex)
            {
                _logger.Error(ex.ToString());
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
