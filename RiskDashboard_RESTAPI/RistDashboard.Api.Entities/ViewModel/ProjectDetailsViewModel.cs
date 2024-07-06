using CsvHelper.Configuration.Attributes;

namespace RistDashboard.Api.Entities.ViewModel
{
    public class ProjectDetailsViewModel
    {

        [Name("Project Name")]
        public string? ProjectName { get; set; }
        [Name("Project Code")]
        public string? ProjectCode { get; set; }
        [Name("Practice")]
        public string? Practice { get; set; }
    }
}
