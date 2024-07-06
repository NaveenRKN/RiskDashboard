namespace RistDashboard.Api.Entities.ViewModel
{
    public class EmailNotificationViewModel
    {
        public int? RiskId { get; set; }
        public string? Owner { get; set; }
        public bool? IsEmailSend { get; set; }
        public DateTime? TargetClosureDate { get; set; }
        public string? EmailFor { get;set; }
    }
}
