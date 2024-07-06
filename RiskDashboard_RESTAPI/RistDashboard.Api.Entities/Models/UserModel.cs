using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RiskDashboard_RESTAPI.Models
{
    [Table("Users")]
    public class UserModel
    {
        [Key]
        public Guid Id { get; set; }
        public string? FirstName { get;set; }
        public string? LastName { get; set; }
        public string? Email { get;set; }
        public string? Password { get; set; }
        public bool IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string? AuthToken { get; set; }
        public DateTime? TokenExpiryTime { get; set; }
    }
}
