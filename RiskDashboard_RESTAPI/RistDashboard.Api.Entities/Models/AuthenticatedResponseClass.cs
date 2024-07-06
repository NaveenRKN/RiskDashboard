namespace RistDashboard.Api.Entities.Models
{
    public class AuthenticatedResponse
    {
        public string? AceessToken { get; set; }
        public string? RefreshToken { get; set; }
        public Guid? UserId { get; set; }
    }
}
