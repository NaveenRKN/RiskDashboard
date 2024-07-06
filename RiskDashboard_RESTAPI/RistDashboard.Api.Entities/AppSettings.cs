namespace RistDashboard.Api.Entities
{
    public class AppSettings
    {
        public static string? JWTIssuer { get; set; }
        public static string? JWTKey { get; set; }
        public static string? RegisterSecretKey { get; set; }
        public static string? Audience { get;set; }
        public static string? EmailSubject { get; set; }
        public static string? EmailBody { get; set; }
        public static string? FromEmailId { get; set; }
        public static string? SmtpServer { get; set; }
        public static int SmtpPort { get; set; }
        public static string? SmtpUsername { get; set; }
        public static string? SmtpPassword { get; set; }
        public static string? ClamAVServerURL { get; set; }
        public static string? ClamAVServerPort { get; set; }
        public static string? ClamAVFileScanner { get; set; }
        public static string? ApprovalEmailbody { get; set; }
    }
}
