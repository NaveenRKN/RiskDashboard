using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RistDashboard.Api.Entities.Models
{
    [Table("FileImportDetails")]
    public class FileImportDetails
    {
        [Key]
        public Guid Id { get; set; }
        public string? FileName { get; set; }
        public DateTime? ImportedDate { get; set; }
        public int? NoOfRecordsCreated { get; set; }
	    public int? NoOfRecordsUpdated { get; set; }
	    public string? ErrorDetails { get; set; }
	    public Guid? UpdatedBy { get; set; }
    }
}
