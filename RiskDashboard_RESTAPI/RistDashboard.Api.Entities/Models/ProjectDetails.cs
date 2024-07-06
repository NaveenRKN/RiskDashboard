using CsvHelper.Configuration.Attributes;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RistDashboard.Api.Entities.Models
{
    [Table("ProjectDetails")]
    public class ProjectDetails
    {
        [Key]
        public Guid Id { get; set; }
        [Name("Project Name")]
        public string? ProjectName { get; set; }
        [Name("Project Code")]
        public string? ProjectCode { get; set; }
        [Name("Practice")]
        public string? Practice { get; set; }
    }
}
