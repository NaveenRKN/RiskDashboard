using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RistDashboard.Api.Entities.Models
{
    [Table("UserToDoList")]
    public class UserToDoList
    {
        [Key]
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string? Description { get; set; }
        public bool IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
