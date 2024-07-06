using CsvHelper.Configuration.Attributes;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RistDashboard.Api.Entities.Models
{
    [Table("RiskInformation")]
    public class RiskInformation
    {
        [Key]
        public Guid Id { get; set; }
        public Guid ProjectDetailsId { get; set; }        
        [NotMapped]
        public string? ProjectName { get; set; }
        [NotMapped]
        public string? Practice { get; set; }
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
        [NotMapped]
        public double? AgeInDays { get; set; }
        [NotMapped]
        public int? AgeInMonths { get; set; }
        [Name("Targeted Closure Date")]
        public DateTime? TargetClosuerDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool? IsEmailSend { get; set; }
        [Name("Risk Status")]
        public string? RiskStatus { get; set; }
        [Name("Owner")]
        public string? Owner { get; set; }
    }
}
