using RiskDashboard_RESTAPI.Models;
using RistDashboard.Api.Entities.Models;
using System.Security.Claims;

namespace RiskDashboard.Api.Services.ServiceContracts
{
    public interface ITokenService
    {
        Task<string> GenerateAccessToken(IEnumerable<Claim> claims);        
        Task<string> GenerateNewAccessToken(UserModel userModel);
        Task<string> GenerateRefreshToken();
        Task<AuthenticatedResponse?> VerifyRefreshTokenAndReGenerate(string refreshToken);
    }
}
