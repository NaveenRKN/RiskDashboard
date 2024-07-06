using CsvHelper.Configuration.Attributes;

namespace RistDashboard.Api.Entities.ViewModel
{
    public class RiskDashboardViewModel
    {
        [Name("Project Name")]
        public string? ProjectName { get; set; }
        [Name("Project Code")]
        public string? ProjectCode { get; set; }
        [Name("Practice")]
        public string? Practice { get; set; }
        [Name("Owner")]
        public string? Owner { get; set; }
        [Name("ID")]
        public int? RiskId { get; set; }
        [Name("Type")]
        public string? Type { get; set; }
        [Name("Sub-Type")]
        public string? SubType { get; set; }
        [Name("Identified Date")]
        public DateTime? IdentifiedDate { get; set; }
        [Name("Description")]
        public string? Description { get; set; }
        [Name("Vulnerability")]
        public string? Vulnerability { get; set; }
        [Name("Risk Source")]
        public string? RiskSource { get; set; }
        [Name("Impacted Areas")]
        public string? ImpactedAreas { get; set; }
        [Name("Information Asset Impacted")]
        public string? InformationAssetImpacted { get; set; }
        [Name("Existing Control")]
        public string? ExistingControl { get; set; }
        [Name("Location")]
        public string? Location { get; set; }
        [Name("Status")]
        public string? Status { get; set; }
        [Name("Analysis Probability")]
        public int? AnalysisProbability { get; set; }
        [Name("Analysis Impact")]
        public int? AnalysisImpact { get; set; }
        [Name("Risk Rating")]
        public string? RiskRating { get; set; }
        [Name("Risk Response")]
        public string? RiskResponse { get; set; }
        [Name("New Controls")]
        public string? NewControls { get; set; }
        [Name("Contingency Plan")]
        public string? ContingencyPlan { get; set; }
        [Name("Mitigation Plan")]
        public string? MitigationPlan { get; set; }
        [Name("Related Policy")]
        public string? RelatedPolicy { get; set; }
        [Name("RTP")]
        public string? RTP { get; set; }
        [Name("Occurrence Count")]
        public int? OccurrenceCount { get; set; }
        [Name("Review Probability")]
        public int? ReviewProbability { get; set; }
        [Name("Review Impact")]
        public int? ReviewImpact { get; set; }
        [Name("Review Rating")]
        public string? ReviewRating { get; set; }
        [Name("Remarks")]
        public string? Remarks { get; set; }
        [Name("Targeted Closure Date")]
        public DateTime? TargetClosuerDate { get; set; }
        [Name("Risk Status")]
        public string? RiskStatus { get; set; }
    }
}
