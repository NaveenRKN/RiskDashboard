using Microsoft.IdentityModel.Tokens;
using RiskDashboard.Api.Services.ServiceContracts;
using RiskDashboard.API.Repositories.RepositoriesContracts.Base;
using RiskDashboard_RESTAPI.Models;
using RistDashboard.Api.Entities;
using RistDashboard.Api.Entities.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace RiskDashboard.Api.Services.Services
{
    public class TokenService : ITokenService
    {

        private readonly IRepositoryWrapper _repoWrapper;
        private readonly IUserService _userService;
        public TokenService(IRepositoryWrapper repoWrapper, IUserService userService)
        {
            _repoWrapper = repoWrapper;
            _userService = userService;
        }
        public async Task<string> GenerateAccessToken(IEnumerable<Claim> claims)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(AppSettings.JWTKey));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                issuer: AppSettings.JWTIssuer,
                expires: DateTime.Now.AddMinutes(20),
                signingCredentials: signinCredentials,
                claims: claims,
                audience: AppSettings.Audience
             );
            return await Task.Run(() =>
            {
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return tokenString;
            });

        }

        public async Task<string> GenerateNewAccessToken(UserModel userModel)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(AppSettings.JWTKey));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var jwtToken = new JwtSecurityToken(
                issuer: AppSettings.JWTIssuer,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: signinCredentials,
                audience: AppSettings.Audience
            );

            return await Task.Run(() =>
            {
                string token = new JwtSecurityTokenHandler().WriteToken(jwtToken);
                return token;
            });
        }

        public async Task<string> GenerateRefreshToken()
        {
            return await Task.Run(() =>
            {
                var randomNumber = new byte[32];
                using (var rng = RandomNumberGenerator.Create())
                {
                    rng.GetBytes(randomNumber);
                    return Convert.ToBase64String(randomNumber);
                }
            });
        }

        public async Task<AuthenticatedResponse?> VerifyRefreshTokenAndReGenerate(string refreshToken)
        {
            AuthenticatedResponse? authenticatedResponse = null;
            List<UserModel> user = await _repoWrapper.UserRepository.FindByCondition(x => x.AuthToken == refreshToken);
            if (user is null || user.Count == 0)
            {
                return null;
            }
            else
            {
                var newAccessToken = await GenerateNewAccessToken(user[0]);
                user[0].TokenExpiryTime = DateTime.Now.AddDays(7);
                await _userService.UpdateUserToken(user[0]);
                authenticatedResponse = new AuthenticatedResponse
                {
                    AceessToken = newAccessToken,
                    RefreshToken = user[0].AuthToken,
                    UserId = user[0].Id
                };
            }
            return authenticatedResponse;
        }
    }
}
